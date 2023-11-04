function Footer() {
  const year = new Date().getFullYear()
  return(
    <div>
      {/*Подвал*/}
      <footer className="footer">
        <p className="footer__copyright">{`© ${year} Mesto Russia`}</p>
      </footer>
    </div>
  )
}

export default Footer