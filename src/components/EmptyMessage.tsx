import clip from '../todo-list/assets/Clipboard.svg'
import styles from './EmptyMessage.module.css'

export function EmptyMessage() {
    return (
        <div className={styles.empty}>
            <img src={clip} alt="Logo de uma prancheta" />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <p>Crie tarefas e organize seus itens a fazer</p>
        </div>
    )
}