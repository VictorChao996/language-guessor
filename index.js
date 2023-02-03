
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import { franc, francAll } from "franc";
const langs = require("langs");
const colors = require("colors");

import { argv } from 'node:process';
//取得參數並存為Array
let inputs = argv.slice(2);

//使用franc modules 判斷語言碼，並透過langs modules尋找語言碼的全名
for (let i=0; i<inputs.length; i++) {
    let output = "";
    
    let langCode = franc(inputs[i]);
    if(langs.has("2T", langCode)){
        output = inputs[i] + '\n==>' + langs.where("2T", langCode).name;
    }else if(langs.has("2B", langCode)){
        output = inputs[i] + '\n==>' + langs.where("2B", langCode).name;
    }else if(langs.has("3",langCode)){
        output = inputs[i] + '\n==>' + langs.where("3", langCode).name;
    }
    else{
        const errorText = 
        `
        ==========
        You have encountered these situations:
        1. The input is not a word or sentence in any language.
        2. The input is too short.
        3. The language code [${langCode}] generate by "franc" module is not recognized by the "langs" module.

        Please try again.
        ==========\n
        `;
        console.log(`Input ${i+1}: ` + inputs[i].red);
        // console.log('=========='.red);
        // console.log('You have encountered these situations:'.red);
        // console.log('1. The input is not a word or sentence in any language.'.red);
        // console.log('2. The input is too short.'.red);
        // console.log('Please try again.'.red);
        // console.log('==========\n'.red);
        console.log(errorText.red);
    }
    if(output !== "")
        console.log(`Input ${i+1}: ` + output.green);
        
}

