import test from 'node:test';
import assert from 'node:assert/strict';
import { handleContact } from '../lib/contact/handler';
const contact = { name: 'Test', email: 'test@example.com', phone: '+41 00 000 00 00', website: 'https://example.com', company: 'Test', message: '<script>untrusted</script>\nBonjour' };
const request = (body: unknown) => new Request('https://iapmesuisse.ch/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
test('provider rejection and missing receipt never claim success', async () => {
 for (const result of [{ error: { message: 'Domain not verified' }, data: null }, { data: null }, {}]) { const r = await handleContact(request(contact), async () => result); assert.equal(r.status, 502); assert.equal((await r.json()).success, false); }
});
test('exception never leaks credentials or provider detail', async () => { const r = await handleContact(request(contact), async () => { throw Error('private-key'); }); assert.equal(r.status, 502); assert.ok(!(await r.text()).includes('private-key')); });
test('accepted message preserves full contact and sends untrusted input as plain text', async () => { let calls = 0; const r = await handleContact(request(contact), async mail => { calls++; assert.equal(mail.to, 'contact@vocalis.pro'); assert.match(mail.text, /Téléphone : \+41/); assert.ok(mail.text.includes(contact.website)); assert.ok(mail.text.includes(contact.message)); assert.equal('html' in mail, false); return { data: { id: 'test-receipt' }, error: null }; }); assert.equal(calls, 1); assert.deepEqual(await r.json(), { success: true }); });
test('bad input cannot reach provider', async () => { for (const patch of [{ name: 123 }, { name: 'Test\nBcc:x' }, { email: 'invalid' }, { company: {} }, { phone: 'call me 123456789' }, { website: 'javascript:alert(1)' }, { message: 'x'.repeat(10001) }, { botcheck: true }]) { let calls = 0; const r = await handleContact(request({ ...contact, ...patch }), async () => { calls++; return {}; }); assert.equal(r.status, 400); assert.equal(calls, 0); } });
test('oversize and unsupported requests rejected before sending', async () => { const r = await handleContact(request({ ...contact, message: 'x'.repeat(40000) }), async () => { throw Error('must not send'); }); assert.equal(r.status, 413); const q = await handleContact(new Request('https://iapmesuisse.ch/api/contact', { method:'POST', body:'{}' }), async () => ({})); assert.equal(q.status, 415); });

test('Windows multiline messages remain accepted', async () => { const r = await handleContact(request({ ...contact, message: 'Bonjour\r\nSuite' }), async mail => { assert.ok(mail.text.includes('Bonjour\nSuite')); return { data: { id: 'receipt' } }; }); assert.equal(r.status, 200); });
