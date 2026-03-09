"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"

function calculateReadTime(content: string){

const words = content.split(" ").length
const minutes = Math.ceil(words / 200)

return `${minutes} min read`

}

export default function Articles(){

const [articles,setArticles] = useState([])

useEffect(()=>{

axios.get("http://localhost:8080/articles")
.then(res=>{
setArticles(res.data || [])
})

},[])

return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-8">
Latest Articles
</h1>

<div className="grid gap-6">

{articles.length === 0 && (
<p className="text-gray-400">No articles yet</p>
)}

{articles.map((article:any)=>(

<Link
key={article.id}
href={`/article/${article.slug}`}
>

<div className="p-6 bg-gray-900 rounded hover:bg-gray-800">

<h2 className="text-xl font-bold mb-2">
{article.title}
</h2>

<p className="text-gray-400 text-sm">
By {article.author_name} • {calculateReadTime(article.content)}
</p>

</div>

</Link>

))}

</div>

</div>

)

}