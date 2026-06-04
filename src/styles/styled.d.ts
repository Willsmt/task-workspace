import 'styled-components';
import type { AppTheme } from './theme';

declare module 'styled-components' {
  // Estende o DefaultTheme com nossos tokens tipados.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends AppTheme {}
}
