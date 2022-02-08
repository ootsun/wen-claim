import NextDocument, {Html, Head, Main, NextScript} from 'next/document'

export default class MyDocument extends NextDocument {
  static getInitialProps(ctx) {
    return NextDocument.getInitialProps(ctx)
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8"/>
          <meta name="robots" content="follow, index"/>
          <meta name="description" content="Optimize the frequency of your claims and compounds in DeFi"/>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400&family=Lobster&display=swap"
                rel="stylesheet"/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>

        <body className="body">
        <Main/>
        <NextScript/>
        </body>
      </Html>
    )
  }
}
