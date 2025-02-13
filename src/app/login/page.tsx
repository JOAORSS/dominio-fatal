import FormLogin from "@/components/formLogin";
import styles from "./login.module.css"
import LogedRedirect from "@/utils/userValidation/logedRedirect";


export default function Login() {
    return(
        <main className={styles.leyoutlogin}>
            <LogedRedirect>
                <FormLogin />
            </LogedRedirect>
        </main>
    )
}
