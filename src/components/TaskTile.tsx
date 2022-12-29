import { Circle, Trash, CheckCircle } from 'phosphor-react'
import { useState } from 'react'

import styles from './TaskTile.module.css'

interface TaskTileProps {
    content: string,
    onClick: () => void,
    onDeleteTask: () => void
}

export function TaskTile({ content, onClick, onDeleteTask }: TaskTileProps) {
    const [isMarked, setIsMarked] = useState(false)

    const handleMarkTask = () => {
        setIsMarked(!isMarked)
        onClick()
    }

    return (
        <div className={styles.task}>
            <div className={styles.radio}>
                {isMarked === true
                    ? <CheckCircle color='#8284FA' size={24} cursor='pointer' weight='bold' onClick={handleMarkTask} />
                    : <Circle color='#4EA8DE' size={24} cursor='pointer' weight='bold' onClick={handleMarkTask} />
                }

            </div>
            <p className={isMarked === true ? styles.textMared : ''}>
                {content}
            </p>
            <div className={styles.trash}>
                <Trash size={20} onClick={onDeleteTask} />
            </div>
        </div>
    )
}