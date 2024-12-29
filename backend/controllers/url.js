import { nanoid } from "nanoid";
import { Url } from '../models/url.models.js'

async function handleGenerateNewURL(req,res){
  const shortID = nanoid(8);
  const body= req.body;
  if(!body.url) return res.status(404).json({mess:"please provide a url"})
 const response = await Url.create({
    shortId: shortID,
    redirectUrl: body.url,
    visistedHistory:[],
  })

  return res.json({ID:shortID})
}

async function handleRedirectToOriginalURL(req,res){
    const shortId = req.params.shortId
    const entry = await Url.findOneAndUpdate({shortId},{$push:{visistedHistory: {timestamp:Date.now()},},});
    res.redirect(entry.redirectUrl)
}

async function handleAnalytics(req,res){
  const shortId = req.params.shortId;
  const result = await Url.findOne({shortId})
  if(!result) return res.status(404).json({mess:"URL not found"})
 return res.status(200).json({totalClicks: result.visistedHistory.length,
  analytics : result.visistedHistory
})
}

async function showShortAndRedirectUrl(req,res){
    const dataUrl = await Url.find({});
    return res.end(`
    <html>
    <head></head>
    <body>
    <ol>
    ${
        dataUrl.map((data)=> `<li>${data.shortId} - ${data.redirectUrl} total clicks = ${data.visistedHistory.length}</li>`).join("")
    }
    </ol>
    </body>
    </html>
    `)
}
export { handleGenerateNewURL,handleRedirectToOriginalURL,handleAnalytics ,showShortAndRedirectUrl}