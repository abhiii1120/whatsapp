import {clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';


//combine class names to eliminate tailwind conflicts

export function cn(...inputs){
    return twMerge(clsx(inputs));
}