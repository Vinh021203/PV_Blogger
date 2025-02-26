import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Post from "./pages/Post";
import PostDetail from "./pages/PostDetail";
import Author from "./pages/Author";
import Login from "./pages/Login"; 
import Register from "./pages/Register"; 
import About from "./pages/About"; // ✅ Import trang Giới thiệu
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <main className="container p-4 mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<Post />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/author/:id" element={<Author />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} /> {/* ✅ Đã thêm trang Giới thiệu */}
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </Router>
  );
}

export default App;
