<template>
	<main>
		<div>
			<button-action type="primary">Primary</button-action>
			<button-action type="secondary">Secondary</button-action>
			<button-action type="success">Success</button-action>
			<button-action type="warning">Warning</button-action>
		</div>
		<div>
			<button-action disabled type="primary">Primary</button-action>
			<button-action disabled type="secondary">Secondary</button-action>
			<button-action disabled type="success">Success</button-action>
			<button-action disabled type="warning">Warning</button-action>
		</div>
		<div>
			<button-action outlined type="primary">Primary</button-action>
			<button-action outlined type="secondary">Secondary</button-action>
			<button-action outlined type="success">Success</button-action>
			<button-action outlined type="warning">Warning</button-action>
		</div>
		<div>
			<button-action outlined disabled type="primary">Primary</button-action>
			<button-action outlined disabled type="secondary">Secondary</button-action>
			<button-action outlined disabled type="success">Success</button-action>
			<button-action outlined disabled type="warning">Warning</button-action>
		</div>

	</main>
</template>

<script>
export default {
	layout: 'default',
}
</script>
