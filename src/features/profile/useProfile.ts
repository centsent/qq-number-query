import { useState, ChangeEvent, KeyboardEvent } from "react";
import { getUserInfo, UserInfo } from './profileAPI';
import { debounce, isValidQQNumber, throttle } from '../../utils/utils';

const INVALID_QQ_NUMBER_ERROR = 'please input a valid QQ number.';
const defaultUserInfo: UserInfo = {
		name: '',
		qlogo: '',
		qqnumber: '',
};

export function isEmptyUser(userInfo: UserInfo): boolean {
	const { name, qlogo, qqnumber } = userInfo;

	return qqnumber === '' && qlogo === '' && name === '';
}

export const useProfile = () => {
	const [error, setError] = useState('');
	const [qqnumber, setQqnumber] = useState('');
	const [userInfo, setUserInfo] = useState<UserInfo>(defaultUserInfo);
	const [isLoading, setIsLoading] = useState(false);

	// Validate the input and the correct value, otherwise return an error.
	const handleChange = debounce((event: ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			const isValid = isValidQQNumber(value);

			if (!isValid) {
				setError(INVALID_QQ_NUMBER_ERROR);
				return;
			}

			setError('');
			setUserInfo(defaultUserInfo);
			setQqnumber(value);
	});

	// Submit the API request.
	const submit = () => {
		const isValid = isValidQQNumber(qqnumber);

		if (isValid) {
			setIsLoading(true);
			getUserInfo(qqnumber)
			.then((userInfo: UserInfo) => {
				setUserInfo(userInfo);
				setIsLoading(false);
			})
			.catch(err => {
				setError(err.message);
				setIsLoading(false);
			});
		}
	};

	// Send API request when pressed Enter key.
	const handleKeyUp = throttle((event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			submit();
		}
	});

	// Send API request when mouse out.
	const handleSubmit = throttle((_: ChangeEvent<HTMLInputElement>) => submit());

	return {
		error,
		handleChange,
		handleKeyUp,
		handleSubmit,
		isLoading,
		userInfo,
	}
};
