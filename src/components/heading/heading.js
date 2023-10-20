import Link from 'next/link'
import heading from './heading.module.css'

export default function HeadingComponent({ title, link, link_title }) {
    return (
        <div className={heading.container}>

            {title ? (
                <h3 className={heading.Heading}>
                    {title}
                </h3>
            ) : null}

            {link && link_title ? (
                <h5 className={heading.viewMore}>
                    <Link href={link} className={heading.a}>{link_title}</Link>
                </h5>
            ) : null}

        </div>
    );
}
