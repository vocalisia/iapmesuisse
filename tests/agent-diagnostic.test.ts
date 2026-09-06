import assert from 'node:assert/strict';
import test from 'node:test';
import { AGENT_OPTIONS, callbackPayload, normalizeWebsite, recommendAgent, validateCallback, validateDiagnosis, type Callback, type Diagnosis } from '../lib/free-tools/agent-diagnostic';
import { submitCallback } from '../lib/free-tools/callback-submit';
const diagnosis: Diagnosis = { company: 'Entreprise exemple', niche: 'Garage automobile', website: 'exemple.ch', goal: 'appointments', channels: ['phone', 'website'], volume: 'medium', sensitive: 'unknown', needs: 'Préparer les demandes de rendez-vous atelier', systems: 'Agenda atelier' };
const contact: Callback = { name: 'Contact de test', email: 'test@example.com', phone: '+41 79 000 00 00', preferredTime: 'Après-midi', consent: true, botcheck: false };
test('each declared priority maps to an explained agent, not an invented website audit', () => {
  for (const goal of Object.keys(AGENT_OPTIONS) as Diagnosis['goal'][]) {
    const r = recommendAgent({ ...diagnosis, goal }); assert.equal(r.agent, AGENT_OPTIONS[goal].agent); assert.ok(r.reason.includes(diagnosis.niche)); assert.ok(r.limitation.includes('sans analyse automatique')); assert.ok(r.metric.length > 20);
  }
});
test('low volume and sensitive data change implementation guidance', () => {
  assert.match(recommendAgent({ ...diagnosis, volume: 'low' }).nextStep, /automatisation simple/);
  assert.match(recommendAgent({ ...diagnosis, sensitive: 'yes' }).control, /droits d’accès/);
  assert.notEqual(recommendAgent({ ...diagnosis, sensitive: 'no' }).control, recommendAgent(diagnosis).control);
});
test('website normalization never triggers a fetch and rejects non-web addresses', () => {
  assert.equal(normalizeWebsite('entreprise.ch'), 'https://entreprise.ch/'); assert.equal(normalizeWebsite(''), '');
  for (const value of ['javascript:alert(1)', 'https://user:password@example.com', 'file:///etc/passwd', 'not a site', 'https://localhost']) assert.throws(() => normalizeWebsite(value));
});
test('invalid tasks, channels and bounds cannot produce an orientation', () => {
  for (const patch of [{ goal: '__proto__' }, { channels: [] }, { channels: ['email', 'email'] }, { channels: ['other'] }, { niche: '' }, { needs: 'x'.repeat(2501) }, { volume: 'huge' }, { sensitive: 'maybe' }, { company: 'x\u202Ey' }]) assert.throws(() => validateDiagnosis({ ...diagnosis, ...patch } as Diagnosis));
});
test('callback requires email, phone, consent and an empty honeypot', () => {
  for (const patch of [{ email: 'invalid' }, { phone: '123' }, { phone: 'call me now 123456789' }, { consent: false }, { botcheck: true }, { name: '' }, { email: 'person@example.com\nBcc:other@example.com' }]) assert.throws(() => validateCallback({ ...contact, ...patch }));
});
test('lead includes complete brief and source without query parameters', () => {
  const p = callbackPayload(diagnosis, contact, '/fr/services?email=private@example.com#details');
  assert.equal(p.phone, contact.phone); assert.equal(p.company, diagnosis.company); assert.equal(p.website, 'https://exemple.ch/'); assert.match(p.message, /Garage automobile/); assert.match(p.message, /Agent de prise de rendez-vous/); assert.match(p.message, /Agenda atelier/); assert.match(p.message, /https:\/\/iapmesuisse.ch\/fr\/services/); assert.ok(!p.message.includes('private@example.com'));
});
test('provider acceptance is required; all rejection and network outcomes fail', async () => {
  for (const response of [new Response('{"success":false}', { status: 200 }), new Response('{"success":true}', { status: 429 }), new Response('not json', { status: 500 })]) await assert.rejects(submitCallback(diagnosis, contact, '/fr', (async () => response) as typeof fetch), /pas été confirmé/);
  await assert.rejects(submitCallback(diagnosis, contact, '/fr', (async () => { throw Error('network'); }) as typeof fetch), /pas été confirmé/);
});
test('successful provider response sends one explicit request with complete contact data', async () => {
  let calls = 0;
  await submitCallback(diagnosis, contact, '/fr/ressources', (async (url, init) => { calls++; assert.equal(url, 'https://api.web3forms.com/submit'); const payload = JSON.parse(String(init?.body)); assert.equal(payload.email, contact.email); assert.match(payload.message, /explicitement demandé/); return new Response('{"success":true}', { status: 200 }); }) as typeof fetch);
  assert.equal(calls, 1);
});
test('invalid consent never calls the contact provider', async () => {
  let calls=0; await assert.rejects(submitCallback(diagnosis, { ...contact, consent: false }, '/fr', (async () => { calls++; return new Response('{}'); }) as typeof fetch)); assert.equal(calls,0);
});
