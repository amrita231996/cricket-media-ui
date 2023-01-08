import { getStorageItem } from '../../utils/sessionStorage';
import {BEARER} from '../constants/user.constants';

export const isUserLoggedIn = () => getStorageItem(BEARER) !== undefined;