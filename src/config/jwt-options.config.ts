import { JwtModuleOptions } from '@nestjs/jwt';

export default () => ({
  jwtOptions: <JwtModuleOptions>{
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: `${process.env.JWT_EXP}s`,
    },
  },
});
