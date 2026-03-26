<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Sitemap</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<style type="text/css">
body{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;color:#333;max-width:1200px;margin:0 auto;padding:20px}
h1{color:#1a73e8;font-size:24px;margin-bottom:20px}
table{width:100%;border-collapse:collapse;margin-top:10px}
th{background:#1a73e8;color:#fff;padding:12px 15px;text-align:left;font-size:13px}
td{padding:10px 15px;border-bottom:1px solid #eee;font-size:13px}
tr:hover{background:#f5f5f5}
a{color:#1a73e8;text-decoration:none}
a:hover{text-decoration:underline}
.count{color:#666;margin-bottom:20px;font-size:14px}
</style>
</head>
<body>
<h1>Sitemap</h1>
<p class="count">Nombre d'URLs: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></p>
<table>
<tr><th>URL</th><th>Dernière modification</th><th>Fréquence</th><th>Priorité</th></tr>
<xsl:for-each select="sitemap:urlset/sitemap:url">
<tr>
<td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
<td><xsl:value-of select="sitemap:lastmod"/></td>
<td><xsl:value-of select="sitemap:changefreq"/></td>
<td><xsl:value-of select="sitemap:priority"/></td>
</tr>
</xsl:for-each>
</table>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
