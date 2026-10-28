import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('..',import.meta.url));
const projects=JSON.parse(await fs.readFile(path.join(root,'content/projects.json'),'utf8'));
assert(projects.length>0,'Empty collection');
assert.equal(new Set(projects.map(p=>p.id)).size,projects.length,'Duplicate project ids');
assert.equal(new Set(projects.map(p=>p.source)).size,projects.length,'Duplicate sources');
for(const p of projects){for(const field of ['id','name','title','team','summary','why','how','limit','status','source','demo','image','imageCredit','addedAt','verifiedAt'])assert.equal(typeof p[field],'string',`${p.id}: invalid ${field}`);assert(/^[a-z0-9-]+$/.test(p.id));assert(Number.isInteger(p.year));assert(p.topics.length>0);assert(p.summary.length<=100,`${p.id}: summary too long`);assert(!path.isAbsolute(p.image)&&!p.image.includes('..'));await fs.access(path.join(root,'dist',p.image));for(const key of ['source','demo','paper','code'])if(p[key])assert.equal(new URL(p[key]).protocol,'https:');for(const key of ['addedAt','verifiedAt'])assert(/^\d{4}-\d{2}-\d{2}$/.test(p[key]));}
const generated=JSON.parse(await fs.readFile(path.join(root,'dist/projects.json'),'utf8'));assert.deepEqual(generated,projects,'Run build after editing content');
const rss=await fs.readFile(path.join(root,'dist/feed.xml'),'utf8');assert.equal((rss.match(/<item>/g)||[]).length,projects.length);assert.equal(new Set([...rss.matchAll(/<guid isPermaLink="false">([^<]+)<\/guid>/g)].map(m=>m[1])).size,projects.length);
console.log(`Validated ${projects.length} unique projects, local assets, safe resource URLs and RSS GUIDs.`);
