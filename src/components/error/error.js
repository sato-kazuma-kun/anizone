import errorStyle from './error.module.css'

export default function ErrorComponent({ error, onRetryClick }) {
    return (
      error !== null
        ? onRetryClick !== null
          ? (
            <div className={errorStyle.error} style={{ borderTop: "0px" }}>
              <h3 className={errorStyle.errorText}>{error}</h3>
              <button className={errorStyle.retryButton} onClick={onRetryClick}>
                Retry
              </button>
            </div>
          )
          : (
            <div className={errorStyle.error} style={{ borderTop: "0px" }}>
              <h3 className={errorStyle.errorText}>{error}</h3>
            </div>
          )
        : null
    );
  }
  
