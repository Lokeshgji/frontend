"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "next/navigation"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import Link from "next/link"

export default function ArticlePage(){

const params = useParams()
const slug = params.slug

const [article,setArticle] = useState<any>(null)

useEffect(()=>{

axios.get(`http://localhost:8080/articles/${slug}`)
.then(res=>{
setArticle(res.data)
})

},[])

if(!article){
return <div className="p-10">Loading...</div>
}

return(

<div className="p-10 max-w-3xl mx-auto">

<h1 className="text-4xl font-bold mb-2">
  {article.title}
</h1>

<Link
  href={`/author/${article.author_id}`}
  className="text-blue-400 mb-6 block"
>
  View Author
</Link>

<div className="prose prose-invert max-w-none">
  <ReactMarkdown>{article.content}</ReactMarkdown>
</div>

</div>

)

}