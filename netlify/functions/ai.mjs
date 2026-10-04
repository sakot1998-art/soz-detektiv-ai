import OpenAI from "openai";

export default async (req) => {
  if (req.method !== "POST") return new Response(JSON.stringify({ok:true,message:"SÖZ DETEKTIV AI function is online."}),{status:200,headers:{"Content-Type":"application/json"}});
  try {
    const {word,sentence}=await req.json();
    if(!word||!sentence)return new Response(JSON.stringify({error:"Сөз бен сөйлем қажет."}),{status:400,headers:{"Content-Type":"application/json"}});
    const apiKey=Netlify.env.get("OPENAI_API_KEY");
    if(!apiKey)return new Response(JSON.stringify({error:"OPENAI_API_KEY табылмады."}),{status:500,headers:{"Content-Type":"application/json"}});
    const client=new OpenAI({apiKey});
    const response=await client.responses.create({
      model:"gpt-5-mini",
      input:[
        {role:"system",content:"Сен 4-сынып оқушысына қазақ тілін түсіндіретін көмекшісің. Сөздің жалпы мағынасын емес, тек берілген сөйлемдегі контекстік мағынасын анықта. Егер сөз көп мағыналы болса, сөйлемге сүйен. Жауапты 2-3 қысқа, түсінікті сөйлеммен қазақша бер."},
        {role:"user",content:`Сөз: ${word}\nСөйлем: ${sentence}\nОсы сөйлемдегі «${word}» сөзінің мағынасын түсіндір.`}
      ]
    });
    return new Response(JSON.stringify({answer:response.output_text||"ЖИ жауап бере алмады."}),{status:200,headers:{"Content-Type":"application/json"}});
  } catch(error) {
    return new Response(JSON.stringify({error:"AI қатесі",details:error?.message||"Белгісіз қате"}),{status:500,headers:{"Content-Type":"application/json"}});
  }
};
