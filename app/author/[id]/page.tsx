"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export default function AuthorPage(){

const params = useParams()
const id = params.id

const [author,setAuthor] = useState<any>(null)
const [articles,setArticles] = useState<any[]>([])
const [loading,setLoading] = useState(true)
const [error,setError] = useState("")

useEffect(()=>{

const fetchData = async () => {

try{

const authorRes = await axios.get(
`http://localhost:8080/authors/${id}`
)

setAuthor(authorRes.data)

const articleRes = await axios.get(
`http://localhost:8080/authors/${id}/articles`
)

setArticles(articleRes.data || [])

}catch(err:any){

setError(
err?.response?.data?.error ||
"Author not found"
)

}finally{

setLoading(false)

}

}

fetchData()

},[id])

if(loading){
return <div className="p-10">Loading...</div>
}

if(error){
return (
<div className="p-10 text-red-400 text-center">
{error}
</div>
)
}

return(

<div className="p-10 max-w-3xl mx-auto">

<h1 className="text-3xl font-bold mb-2">
{author.name}
</h1>

<p className="text-gray-400 mb-2">
{author.email}
</p>

<p className="text-gray-400 mb-6">
{articles.length} Articles Published
</p>

<h2 className="text-xl mb-4">
Articles by {author.name}
</h2>

{articles.length === 0 && (
<p className="text-gray-400">
No articles published yet
</p>
)}

<div className="grid gap-4">

{articles.map((article:any)=>(
<Link
key={article.id}
href={`/article/${article.slug}`}
>

<Card className="mb-4 hover:shadow-md transition">

<CardContent className="p-5">

<h3 className="text-xl font-semibold text-gray-900">
{article.title}
</h3>

<p className="text-gray-500 text-sm mt-1">
Read article →
</p>

</CardContent>

</Card>

</Link>
))}

</div>

</div>

)

}