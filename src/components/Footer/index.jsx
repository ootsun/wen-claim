function Footer() {
  return (
    <footer className="flex justify-center items-center h-12">
      <p>Feedback, suggestion or bug report?</p>
      <a href="https://twitter.com/Oo_Tsun" target="_blank" rel="noreferrer" className="ml-2">
        <img
          src="twitter.svg"
          alt="Twitter"/>
      </a>
      <a href="https://github.com/ootsun/wen-claim" target="_blank" rel="noreferrer" className="ml-2">
        <img
          src="github.svg"
          alt="Github"/>
      </a>
    </footer>
  );
}

export default Footer;
