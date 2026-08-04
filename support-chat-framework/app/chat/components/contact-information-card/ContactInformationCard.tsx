import { Button } from "~/components/ui/button";
import { ContactInformation } from "./ContactInformation";
import { ContactInformationSkeleton } from "./ContactInformationSkeleton";
import { NoContactSelected } from "./NoContactSelected";

export const ContactInformationCard = () => {

    return <NoContactSelected />

    return <ContactInformationSkeleton />

    return <ContactInformation />;
};