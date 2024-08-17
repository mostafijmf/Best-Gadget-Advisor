'use client';
import { Icon } from "@iconify/react";

const Icons = ({ icon = '', width = 0, className }) => {
    return (
        <Icon icon={icon} width={width} className={className} />
    );
};

export default Icons;