const express=require('express');const fs=require('fs');const path=require('path');
const app=express();const PORT=3001;const DB=path.join(__dirname,'data.json');
app.use(express.json());app.use(express.static(path.join(__dirname,'public')));
if(!fs.existsSync(DB)){fs.writeFileSync(DB,JSON.stringify({name:'Krishna Awasthi',title:'Backend & IoT Engineer',photos:[],certificates:[],links:[]},null,2))}
const read=()=>JSON.parse(fs.readFileSync(DB,'utf8')); const write=(d)=>fs.writeFileSync(DB,JSON.stringify(d,null,2));
app.post('/api/login',(req,res)=>{const {username,password}=req.body||{};if(username==='me'&&password==='123')return res.json({ok:true});res.status(401).json({ok:false})});
app.get('/api/portfolio',(_req,res)=>res.json(read()));
app.put('/api/portfolio',(req,res)=>{if(req.headers['x-admin']!=='me-123')return res.status(401).json({message:'Unauthorized'});write(req.body);res.json({ok:true})});
app.listen(PORT,()=>console.log('V3 running on http://localhost:'+PORT));
