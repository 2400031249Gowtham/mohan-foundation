const fs=require('fs'); 
const path=require('path'); 
const data=[
  {id:'1',src:'/courses-1/FamilyCourse.jpg'},
  {id:'2',src:'/courses-1/LegalCourse.jpg'},
  {id:'3',src:'/courses-1/ESSENTIAL.jpg'},
  {id:'4',src:'/courses-1/PGDTC.jpg'},
  {id:'5',src:'/courses-1/Orgains.jpg'},
  {id:'6',src:'/courses-1/BrainCourse.jpg'},
  {id:'7',src:'/courses-1/BrainCourse-2.jpg'},
  {id:'8',src:'/courses-1/SAVINGLIVES.jpg'},
  {id:'9',src:'/courses-2/giftoflife.jpg'},
  {id:'10',src:'/courses-2/KIDNEY.jpg'},
  {id:'11',src:'/courses-2/LIVER.jpg'},
  {id:'12',src:'/courses-2/LUNG.jpg'},
  {id:'13',src:'/courses-2/gol.jpg'}
]; 

const outDir=path.join(process.cwd(),'public','courses-official'); 
if(!fs.existsSync(outDir)) fs.mkdirSync(outDir,{recursive:true}); 

data.forEach(item=>{ 
  const srcPath=path.join(process.cwd(),'public',item.src); 
  const destPath=path.join(outDir,`course-${item.id}.jpg`); 
  if(fs.existsSync(srcPath)) { 
    fs.copyFileSync(srcPath,destPath); 
    console.log(`Copied ${item.src} to course-${item.id}.jpg`); 
  } else { 
    console.log(`Missing: ${srcPath}`); 
  } 
});
