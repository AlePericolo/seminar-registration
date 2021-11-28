import React from "react";

import Header from "@/common/header";
import Footer from "@/common/footer";
import Dashboard from "@/components/ui/dashboard";

export default () => (
	<div className="container-fluid px-0">
		<Header />
		<Dashboard />
		<Footer />
	</div>
);
