import type AddressTrait from '../types/address-trait';
import type CompanyTrait from '../types/company-trait';

export default interface IdentifyTraits {
  address?: AddressTrait | undefined;
  age?: number | undefined;
  avatar?: string | undefined;
  birthday?: string | undefined;
  company?: CompanyTrait | undefined;
  createdAt?: string | undefined;
  description?: string | undefined;
  email?: string | undefined;
  firstName?: string | undefined;
  gender?: string | undefined;
  id?: string | undefined;
  lastName?: string | undefined;
  name?: string | undefined;
  phone?: string | undefined;
  title?: string | undefined;
  username?: string | undefined;
  website?: string | undefined;
}
