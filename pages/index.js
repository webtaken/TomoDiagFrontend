import LayoutPage from "../components/layout/LayoutPage";
import AppOptions from "../components/Options/AppOptions";
import styles from '../styles/Home.module.css'


export default function Home() {
  return (
    <>
      <LayoutPage>
        <div className="site-layout-content">
        <div className={styles.home}>
       <h2>Bienvenido a la clínica San Pablo</h2>
      <div>
        <p>
        La clínica San Pablo ofrece una gran variedad de programas de asistencia médica, con el respaldo del Ministerio de Salud. De esta manera usted y 
        su familia pueden acceder a los mejores servicios de salud brindados por profesionales altamente calificados en todas las especialidades de 
        la medicina y apoyados en los más sofisticados equipos médicos para el diagnóstico y tratamiento. 
        Así mismo, contamos con un nuevo servicio el cual es <b>"TomoDiag"</b>, que es una aplicación que diagnostica imágenes de tomografías para detectar anomalías
        o irregularidades que puedan existir en ella. 
        Para ello, usted solo debe afiliarse al programa de San Pablo Salud que más se acomode a sus requerimientos y acudir para su atención a 
        la clinica de San Pablo de su preferencia.

        </p>
        </div>
    </div>
          {/* <AppOptions /> */}
        </div>
      </LayoutPage>
    </>
  )
}
