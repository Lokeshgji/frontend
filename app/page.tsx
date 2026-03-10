"use client"

import Link from "next/link"
import { TypeAnimation } from "react-type-animation"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import api from "@/lib/api"

export default function Home(){

const router = useRouter()

const [query,setQuery] = useState("")
const [articles,setArticles] = useState<any[]>([])
const [suggestions,setSuggestions] = useState<any[]>([])

useEffect(()=>{

const fetchArticles = async ()=>{

try{

const res = await api.get("/articles")
setArticles(res.data || [])

}catch(err){
console.error(err)
}

}

fetchArticles()

},[])

useEffect(()=>{

if(!query){
setSuggestions([])
return
}

const filtered = articles.filter((a:any)=>
a.title.toLowerCase().includes(query.toLowerCase())
)

setSuggestions(filtered.slice(0,5))

},[query,articles])

const searchArticles = () => {

if(!query.trim()) return

router.push(`/articles?q=${encodeURIComponent(query)}`)

}

return(

<div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-900 via-black to-purple-900 text-white px-6 py-20">

{/* Search */}

<div className="w-full max-w-4xl relative flex justify-center gap-3 mb-16">

<input
type="text"
placeholder="Search articles..."
value={query}
onChange={(e)=>setQuery(e.target.value)}
onKeyDown={(e)=>{
if(e.key==="Enter"){
searchArticles()
}
}}
className="w-full max-w-md p-3 rounded-lg bg-white/10 backdrop-blur border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>

<button
onClick={searchArticles}
className="bg-indigo-600 px-5 py-3 rounded-lg hover:bg-indigo-700 transition"
>
Search
</button>

{/* Suggestions */}

{suggestions.length > 0 && (

<div className="absolute top-14 w-full max-w-md bg-black/80 backdrop-blur border border-white/10 rounded-lg shadow-lg">

{suggestions.map((article:any)=>(

<Link
key={article.id}
href={`/article/${article.slug}`}
className="block px-4 py-3 hover:bg-white/10 transition"
>

{article.title}

</Link>

))}

</div>

)}

</div>


{/* Hero */}

<div className="text-center max-w-3xl">

<h1 className="text-6xl font-bold mb-6">

<TypeAnimation
sequence={[
"ValuableBlogs",
2000,
"Write Your Ideas",
2000,
"Share Your Knowledge",
2000,
]}
wrapper="span"
speed={50}
repeat={Infinity}
/>

</h1>

<p className="text-lg text-gray-300 mb-10">
A modern platform to write, publish and explore ideas.
</p>

<div className="flex justify-center gap-6">

<Link href="/articles">
<Button size="lg">
Explore Articles
</Button>
</Link>

<Link href="/dashboard">
<Button size="lg">
Start Writing
</Button>
</Link>

</div>

</div>


{/* Features */}

<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-5xl w-full">

<div className="bg-white/10 p-6 rounded-xl backdrop-blur hover:bg-white/20 transition">

<h3 className="text-xl font-semibold mb-3">
✍ Write
</h3>

<p className="text-gray-300">
Create beautiful markdown articles with our editor.
</p>

</div>

<div className="bg-white/10 p-6 rounded-xl backdrop-blur hover:bg-white/20 transition">

<h3 className="text-xl font-semibold mb-3">
📚 Explore
</h3>

<p className="text-gray-300">
Discover articles written by developers and creators.
</p>

</div>

<div className="bg-white/10 p-6 rounded-xl backdrop-blur hover:bg-white/20 transition">

<h3 className="text-xl font-semibold mb-3">
🚀 Publish
</h3>

<p className="text-gray-300">
Share your knowledge with the world instantly.
</p>

</div>

</div>

</div>

)

}