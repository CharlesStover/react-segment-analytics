import type IdentifyTraits from './identify-traits';

export default interface Traits
  extends Omit<IdentifyTraits, 'birthday' | 'createdAt' | 'id' | 'phone'> {
  birthday?: Date | number | string | undefined;
  createdAt?: Date | number | string | undefined;
  id?: number | string | undefined;
  phone?: number | string | undefined;
}
