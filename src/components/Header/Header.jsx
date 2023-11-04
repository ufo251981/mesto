import logoFull from '../../image/logo/logo-full.svg'

function Header() {
  return(
    <div>
      {/*Шапка сайта с логотипом*/}
  <header className="header">
    <img
      src={logoFull}
      alt="Логотип сайта Место"
      className="header__logo"
    />
  </header>
    </div>
  )
}

export default Header