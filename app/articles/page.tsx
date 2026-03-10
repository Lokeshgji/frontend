"use client"

import { useEffect, useState } from "react"
import api from "@/lib/api"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

function calculateReadTime(content: string){

const words = content.split(" ").length
const minutes = Math.ceil(words / 200)

return `${minutes} min read`

}

export default function Articles(){

const [articles,setArticles] = useState<any[]>([])
const [loading,setLoading] = useState(true)

useEffect(()=>{

const fetchArticles = async ()=>{

try{

const res = await api.get("/articles")

setArticles(res.data || [])

}catch(err){
console.error(err)
}

setLoading(false)

}

fetchArticles()

},[])

return(

<div className="max-w-4xl mx-auto p-8">

<h1 className="text-4xl font-bold mb-10">
Latest Articles
</h1>

{loading && (
<p className="text-gray-400">Loading articles...</p>
)}

{!loading && articles.length === 0 && (
<p className="text-gray-400">No articles yet</p>
)}

<div className="space-y-6">

{articles.map((article:any)=>(

<Card key={article.id} className="hover:shadow-xl transition">

<CardContent className="p-6">

<h2 className="text-2xl font-semibold mb-2">
{article.title}
</h2>

<p className="text-gray-400 text-sm mb-4">
By {article.author_name || "Unknown"} • {calculateReadTime(article.content)}
</p>

<p className="text-gray-300 line-clamp-2 mb-4">
{article.content.slice(0,150)}...
</p>

<Link href={`/article/${article.slug}`}>

<Button variant="outline">
Read Article
</Button>

</Link>

</CardContent>

</Card>

))}

</div>

</div>

)

}