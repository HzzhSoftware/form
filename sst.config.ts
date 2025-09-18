// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "form-fe",
      removal: "remove",
      //protect: isProd,
      home: "aws",
    };
  },
  async run() {
    const hostedZoneId = process.env.HOSTED_ZONE_ID;
    const certificateArn = process.env.CERTIFICATE_ARN;
    const subdomain = process.env.SUBDOMAIN;

    new sst.aws.Nextjs("Form", {
      domain: {
        name: `${subdomain}.kycombinator.com`,
        dns: sst.aws.dns({
          zone: hostedZoneId
        }), // Add a DNS record to the domain
        cert: certificateArn,
      },
    });
  },
});