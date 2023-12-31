import Image from 'next/image'

export default function Home() {
  return (
    <div className='w-full h-screen'>
      <header className="bg-blue-500">
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-4xl text-white font-bold">Welcome to My Website</h1>
            <p className="text-white mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <button className="bg-white text-blue-500 px-4 py-2 rounded mt-4">Get Started</button>
        </div>
    </header>

    <main className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
            <section>
                <h2 className="text-2xl text-gray-800 font-semibold mb-4">About Us</h2>
                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris interdum, massa eu maximus euismod, velit justo eleifend libero, id aliquam dolor ex ut justo.</p>
            </section>
        </div>
    </main>

   
    </div>
  )
}
