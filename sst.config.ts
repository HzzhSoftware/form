// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "form-fe",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const hostedZoneId = process.env.HOSTED_ZONE_ID;
    const certificateArn = process.env.CERTIFICATE_ARN;

    new sst.aws.Nextjs("Form", {
      domain: {
        name: "form.kycombinator.com",
        dns: sst.aws.dns({
          zone: hostedZoneId
        }), // Add a DNS record to the domain
        cert: certificateArn,
      },
    });
  },
});
