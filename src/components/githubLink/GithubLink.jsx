import styles from "../../index.module.css"

export default function GithubLink({name,  githubLink}) {
    return (
        <div className={styles.linkContainer}>
            <a href={githubLink} target="_blank"> {name}</a>
        </div>
    )
}