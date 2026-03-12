import footerLogo from '../assets/imgs/footer1.png'; 
import footerLogo2 from '../assets/imgs/footer2.png'; 


export const Footer = () => {
    return (
        <footer className="w-full mt-[97px] mb-12 flex justify-between items-center">
            <div className="flex items-center gap-[13px]">
                <img src={footerLogo} width={103} height={40}/>
                <span>AQVEX  ©  2026  |  Все права защищены</span>
            </div>
            <div className="flex items-center gap-[13px]">
                <img src={footerLogo2} width={388} height={34}/>
            </div>

        </footer>
    )
}