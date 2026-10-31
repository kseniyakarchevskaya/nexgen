import { useState } from 'react'
import Page1 from './page1/page1'
import Page2 from './page2/page2'
import Footer from './Footer/footer.jsx'
import Header from './Header/header.jsx'
import Projects from './Projects/projects.jsx'
import Blog from './Blog/blog.jsx'
import Careers from './Careers/careers-page.jsx'
import About from './About/about.jsx'
import BlogArticle from './Blog/blog-article.jsx'
import Contact from './Contact/contact.jsx'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" index element={<Page1/>}/>
            <Route path="/page2" index element={<Page2/>}/>
            <Route path="/projects" index element={<Projects/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/blog" index element={<Blog/>}/>
            <Route path="/blog/:id" element={<BlogArticle/>}/> 
            <Route path="/careers" index element={<Careers/>}/>
            <Route path="/contact" element={<Contact/>}/>
          </Routes>
          <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
