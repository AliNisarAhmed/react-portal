import axios from 'axios';
import { Inspection } from './types';

const uuid = '4fc9c2cd-d3be-484a-b8ec-6d5a54e0feaf';

export const getInspections = async (): Promise<Inspection[]> => {
	const res = await axios.get(`/api/inspections`, {
		headers: {
			uuid,
		},
	});
	return res.data.filter((i: Inspection) => i.customerEmail);
};
