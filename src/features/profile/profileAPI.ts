/**
 * The user information to be shown.
 */
export interface UserInfo {
	/**
	 * The QQ number to search for.
	 */
	qqnumber: string;

	/**
	 * The QQ user name.
	 */
	name: string;

	/**
	 * The avatar of QQ user.
	 */
	qlogo: string;
}

// The success code for API.
const SUCCESS_CODE = 1;
// save the requested data to prevent misuse of the API.
const cachedUserInfo: {[id: string]: UserInfo} = {};

/**
 * Search user info by QQ number.
 * @param {string} qqnumber The number to search for.
 * @returns {UserInfo}
 */
export async function getUserInfo(qqnumber: string): Promise<UserInfo> {
	if (cachedUserInfo[qqnumber]) {
		return cachedUserInfo[qqnumber];
	}

	const response = await fetch(`https://api.uomg.com/api/qq.info?qq=${qqnumber}`); 
	const data = await response.json();
	const { code, msg: message, name, qq, qlogo } = data;

	if (code !== SUCCESS_CODE) {
		return Promise.reject({code, message});
	}

	const userInfo: UserInfo = {
		name,
		qqnumber: qq,
		qlogo,
	};
	cachedUserInfo[qqnumber] = userInfo;
	return userInfo;
}
