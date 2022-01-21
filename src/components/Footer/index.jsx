function Footer() {
  return (
    <footer className="flex justify-center items-center h-max lg:h-12">
      <p className="text-center">This tool has limitations. Use it in addition with other information to define your strategies. Feedback, suggestion or bug report?
        <a href="https://twitter.com/Oo_Tsun" target="_blank" rel="noreferrer" className="ml-2">
          <img src="twitter.svg" alt="Twitter" className="inline"/>
        </a>
        <a href="https://github.com/ootsun/wen-claim" target="_blank" rel="noreferrer" className="ml-2">
          <img src="github.svg" alt="Github" className="inline"/>
        </a>
      </p>
    </footer>
  );
}

export default Footer;
