import { AuthPayload } from '../../security/requireAuth';

declare global {
	namespace Express {
		interface Request {
			user?: AuthPayload;
		}
	}
}
export {}; 