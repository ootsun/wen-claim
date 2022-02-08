import '../styles/globals.css';
import Header from '../components/header.js';
import Footer from '../components/footer.js';

export default function MyApp({Component, pageProps}) {
  return <div className="flex justify-between flex-col min-h-screen">
    <Header/>
    <Component {...pageProps} />
    <Footer/>
  </div>
}
