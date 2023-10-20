import animation from './loading.module.css'

export default function LoadingComponent({ size }) {
    // Default to "small" if size is undefined or null
    const width = size ?? 'small';
  
    return (
        <>
            <section className={animation.ytp_spinner_wrapper}>
                <div className={`${animation.ytp_spinner} ${animation[width]}`} data_layer="4">
                    <div>
                        <div className={animation.ytp_spinner_container}>
                            <div className={animation.ytp_spinner_rotator}>
                                <div className={animation.ytp_spinner_left}>
                                    <div className={animation.ytp_spinner_circle}></div>
                                </div>
                                <div className={animation.ytp_spinner_right}>
                                    <div className={animation.ytp_spinner_circle}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}