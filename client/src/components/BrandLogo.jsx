import villageLogo from '../assets/logo kelurahan.jpeg'

function BrandLogo({ className = '', alt = 'Logo Kelurahan' }) {
  return <img src={villageLogo} alt={alt} className={className} />
}

export default BrandLogo
