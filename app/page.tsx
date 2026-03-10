"use client"

import Link from "next/link"
import { TypeAnimation } from "react-type-animation"
import { Button } from "@/components/ui/button"

export default function Home(){

return(

<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-black to-purple-900 text-white">

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


<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-5xl">

<div className="bg-white/10 p-6 rounded-xl backdrop-blur">

<h3 className="text-xl font-semibold mb-3">
✍ Write
</h3>

<p className="text-gray-300">
Create beautiful markdown articles with our editor.
</p>

</div>

<div className="bg-white/10 p-6 rounded-xl backdrop-blur">

<h3 className="text-xl font-semibold mb-3">
📚 Explore
</h3>

<p className="text-gray-300">
Discover articles written by developers and creators.
</p>

</div>

<div className="bg-white/10 p-6 rounded-xl backdrop-blur">

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