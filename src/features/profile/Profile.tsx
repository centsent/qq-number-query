import { useProfile, isEmptyUser } from "./useProfile";
import { Loading } from "../loading/Loading";
import styles from "./Profile.module.css";

/**
 * A React Component to search and display QQ user info.
 */
export function Profile() {
  const {
    error,
    handleChange,
    handleKeyUp,
    handleSubmit,
    isLoading,
    userInfo,
  } = useProfile();
  const hasError = error !== "";
  let className = styles.qqNumberInput;
  if (hasError) {
    className = `${className} ${styles.danger}`;
  }

  return (
    <div>
      <h2 className={styles.title}>QQ号查询</h2>
      <div className={styles.form}>
        <label>QQ</label>
        <input
          type="text"
          name="qqnumber"
          onChange={handleChange}
          onBlur={handleSubmit}
          onKeyUp={handleKeyUp}
          className={className}
        />

        {hasError && <p className={styles.danger}>{error}</p>}
      </div>

      {isLoading && <Loading />}

      {!isEmptyUser(userInfo) && (
        <div className={styles.userInfo}>
          <img alt="" src={userInfo.qlogo} className={styles.avatar} />
          <div className={styles.info}>
            <div className={styles.name}>{userInfo.name}</div>
            <div className={styles.number}>{userInfo.qqnumber}</div>
          </div>
        </div>
      )}
    </div>
  );
}
