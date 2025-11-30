// //  import { HuggingFaceInference } from '@huggingface/inference';
// const HF_LIB = require('@huggingface/inference');

// // Yeh line check karti hai ki kya library ES Module hai aur phir uska constructor sahi tareeqe se nikaalti hai
// const HuggingFaceInference = HF_LIB.default || HF_LIB;
//         const HF_ACCESS_TOKEN = process.env.HF_Token; // Or directly provide your token
//         const hf = new HuggingFaceInference(HF_ACCESS_TOKEN);

//         async function classifyText() {
//             const text="Movie is great"
//             const result = await hf.textClassification({
//                 model: 'distilbert-base-uncased-finetuned-sst-2-english',
//                 inputs: text,
//             });
//             console.log(result);
//         }

//         // classifyText("This is a great movie!");

//         module.exports={classifyText}