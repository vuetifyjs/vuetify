// Utilities
import { assertType } from 'vitest'

// Types
import type { Equal } from '@test'
import type { ComponentOptionsBase } from 'vue'
import type { VDialogTransition as VDialogTransitionSource } from '@/components/transitions/dialog-transition'
import type { VDialogTransition as VDialogTransitionTypes } from '@/components/transitions/dialog-transition.types'
import type { VDialogBottomTransition as VDialogBottomTransitionSource, VDialogTopTransition as VDialogTopTransitionSource, VExpandBothTransition as VExpandBothTransitionSource, VExpandTransition as VExpandTransitionSource, VExpandXTransition as VExpandXTransitionSource, VFabTransition as VFabTransitionSource, VFadeTransition as VFadeTransitionSource, VScaleTransition as VScaleTransitionSource, VScrollXReverseTransition as VScrollXReverseTransitionSource, VScrollXTransition as VScrollXTransitionSource, VScrollYReverseTransition as VScrollYReverseTransitionSource, VScrollYTransition as VScrollYTransitionSource, VSlideXReverseTransition as VSlideXReverseTransitionSource, VSlideXTransition as VSlideXTransitionSource, VSlideYReverseTransition as VSlideYReverseTransitionSource, VSlideYTransition as VSlideYTransitionSource } from '@/components/transitions/transitions'
import type { VDialogBottomTransition as VDialogBottomTransitionTypes, VDialogTopTransition as VDialogTopTransitionTypes, VExpandBothTransition as VExpandBothTransitionTypes, VExpandTransition as VExpandTransitionTypes, VExpandXTransition as VExpandXTransitionTypes, VFabTransition as VFabTransitionTypes, VFadeTransition as VFadeTransitionTypes, VScaleTransition as VScaleTransitionTypes, VScrollXReverseTransition as VScrollXReverseTransitionTypes, VScrollXTransition as VScrollXTransitionTypes, VScrollYReverseTransition as VScrollYReverseTransitionTypes, VScrollYTransition as VScrollYTransitionTypes, VSlideXReverseTransition as VSlideXReverseTransitionTypes, VSlideXTransition as VSlideXTransitionTypes, VSlideYReverseTransition as VSlideYReverseTransitionTypes, VSlideYTransition as VSlideYTransitionTypes } from '@/components/transitions/transitions.types'
import type { VAlert as VAlertSource } from '@/components/VAlert/VAlert'
import type { VAlert as VAlertTypes } from '@/components/VAlert/VAlert.types'
import type { VAlertTitle as VAlertTitleSource } from '@/components/VAlert/VAlertTitle'
import type { VAlertTitle as VAlertTitleTypes } from '@/components/VAlert/VAlertTitle.types'
import type { VApp as VAppSource } from '@/components/VApp/VApp'
import type { VApp as VAppTypes } from '@/components/VApp/VApp.types'
import type { VAppBar as VAppBarSource } from '@/components/VAppBar/VAppBar'
import type { VAppBar as VAppBarTypes } from '@/components/VAppBar/VAppBar.types'
import type { VAppBarNavIcon as VAppBarNavIconSource } from '@/components/VAppBar/VAppBarNavIcon'
import type { VAppBarNavIcon as VAppBarNavIconTypes } from '@/components/VAppBar/VAppBarNavIcon.types'
import type { VAppBarTitle as VAppBarTitleSource } from '@/components/VAppBar/VAppBarTitle'
import type { VAppBarTitle as VAppBarTitleTypes } from '@/components/VAppBar/VAppBarTitle.types'
import type { VAutocomplete as VAutocompleteSource } from '@/components/VAutocomplete/VAutocomplete'
import type { VAutocomplete as VAutocompleteTypes } from '@/components/VAutocomplete/VAutocomplete.types'
import type { VAvatar as VAvatarSource } from '@/components/VAvatar/VAvatar'
import type { VAvatar as VAvatarTypes } from '@/components/VAvatar/VAvatar.types'
import type { VAvatarGroup as VAvatarGroupSource } from '@/components/VAvatarGroup/VAvatarGroup'
import type { VAvatarGroup as VAvatarGroupTypes } from '@/components/VAvatarGroup/VAvatarGroup.types'
import type { VBadge as VBadgeSource } from '@/components/VBadge/VBadge'
import type { VBadge as VBadgeTypes } from '@/components/VBadge/VBadge.types'
import type { VBanner as VBannerSource } from '@/components/VBanner/VBanner'
import type { VBanner as VBannerTypes } from '@/components/VBanner/VBanner.types'
import type { VBannerActions as VBannerActionsSource } from '@/components/VBanner/VBannerActions'
import type { VBannerActions as VBannerActionsTypes } from '@/components/VBanner/VBannerActions.types'
import type { VBannerText as VBannerTextSource } from '@/components/VBanner/VBannerText'
import type { VBannerText as VBannerTextTypes } from '@/components/VBanner/VBannerText.types'
import type { VBottomNavigation as VBottomNavigationSource } from '@/components/VBottomNavigation/VBottomNavigation'
import type { VBottomNavigation as VBottomNavigationTypes } from '@/components/VBottomNavigation/VBottomNavigation.types'
import type { VBottomSheet as VBottomSheetSource } from '@/components/VBottomSheet/VBottomSheet'
import type { VBottomSheet as VBottomSheetTypes } from '@/components/VBottomSheet/VBottomSheet.types'
import type { VBreadcrumbs as VBreadcrumbsSource } from '@/components/VBreadcrumbs/VBreadcrumbs'
import type { VBreadcrumbs as VBreadcrumbsTypes } from '@/components/VBreadcrumbs/VBreadcrumbs.types'
import type { VBreadcrumbsDivider as VBreadcrumbsDividerSource } from '@/components/VBreadcrumbs/VBreadcrumbsDivider'
import type { VBreadcrumbsDivider as VBreadcrumbsDividerTypes } from '@/components/VBreadcrumbs/VBreadcrumbsDivider.types'
import type { VBreadcrumbsItem as VBreadcrumbsItemSource } from '@/components/VBreadcrumbs/VBreadcrumbsItem'
import type { VBreadcrumbsItem as VBreadcrumbsItemTypes } from '@/components/VBreadcrumbs/VBreadcrumbsItem.types'
import type { VBtn as VBtnSource } from '@/components/VBtn/VBtn'
import type { VBtn as VBtnTypes } from '@/components/VBtn/VBtn.types'
import type { VBtnGroup as VBtnGroupSource } from '@/components/VBtnGroup/VBtnGroup'
import type { VBtnGroup as VBtnGroupTypes } from '@/components/VBtnGroup/VBtnGroup.types'
import type { VBtnToggle as VBtnToggleSource } from '@/components/VBtnToggle/VBtnToggle'
import type { VBtnToggle as VBtnToggleTypes } from '@/components/VBtnToggle/VBtnToggle.types'
import type { VCalendar as VCalendarSource } from '@/components/VCalendar/VCalendar'
import type { VCalendar as VCalendarTypes } from '@/components/VCalendar/VCalendar.types'
import type { VCard as VCardSource } from '@/components/VCard/VCard'
import type { VCard as VCardTypes } from '@/components/VCard/VCard.types'
import type { VCardActions as VCardActionsSource } from '@/components/VCard/VCardActions'
import type { VCardActions as VCardActionsTypes } from '@/components/VCard/VCardActions.types'
import type { VCardItem as VCardItemSource } from '@/components/VCard/VCardItem'
import type { VCardItem as VCardItemTypes } from '@/components/VCard/VCardItem.types'
import type { VCardSubtitle as VCardSubtitleSource } from '@/components/VCard/VCardSubtitle'
import type { VCardSubtitle as VCardSubtitleTypes } from '@/components/VCard/VCardSubtitle.types'
import type { VCardText as VCardTextSource } from '@/components/VCard/VCardText'
import type { VCardText as VCardTextTypes } from '@/components/VCard/VCardText.types'
import type { VCardTitle as VCardTitleSource } from '@/components/VCard/VCardTitle'
import type { VCardTitle as VCardTitleTypes } from '@/components/VCard/VCardTitle.types'
import type { VCarousel as VCarouselSource } from '@/components/VCarousel/VCarousel'
import type { VCarousel as VCarouselTypes } from '@/components/VCarousel/VCarousel.types'
import type { VCarouselItem as VCarouselItemSource } from '@/components/VCarousel/VCarouselItem'
import type { VCarouselItem as VCarouselItemTypes } from '@/components/VCarousel/VCarouselItem.types'
import type { VCheckbox as VCheckboxSource } from '@/components/VCheckbox/VCheckbox'
import type { VCheckbox as VCheckboxTypes } from '@/components/VCheckbox/VCheckbox.types'
import type { VCheckboxBtn as VCheckboxBtnSource } from '@/components/VCheckbox/VCheckboxBtn'
import type { VCheckboxBtn as VCheckboxBtnTypes } from '@/components/VCheckbox/VCheckboxBtn.types'
import type { VChip as VChipSource } from '@/components/VChip/VChip'
import type { VChip as VChipTypes } from '@/components/VChip/VChip.types'
import type { VChipGroup as VChipGroupSource } from '@/components/VChipGroup/VChipGroup'
import type { VChipGroup as VChipGroupTypes } from '@/components/VChipGroup/VChipGroup.types'
import type { VCode as VCodeSource } from '@/components/VCode/VCode'
import type { VCode as VCodeTypes } from '@/components/VCode/VCode.types'
import type { VColorInput as VColorInputSource } from '@/components/VColorInput/VColorInput'
import type { VColorInput as VColorInputTypes } from '@/components/VColorInput/VColorInput.types'
import type { VColorPicker as VColorPickerSource } from '@/components/VColorPicker/VColorPicker'
import type { VColorPicker as VColorPickerTypes } from '@/components/VColorPicker/VColorPicker.types'
import type { VCombobox as VComboboxSource } from '@/components/VCombobox/VCombobox'
import type { VCombobox as VComboboxTypes } from '@/components/VCombobox/VCombobox.types'
import type { VConfirmEdit as VConfirmEditSource } from '@/components/VConfirmEdit/VConfirmEdit'
import type { VConfirmEdit as VConfirmEditTypes } from '@/components/VConfirmEdit/VConfirmEdit.types'
import type { VCounter as VCounterSource } from '@/components/VCounter/VCounter'
import type { VCounter as VCounterTypes } from '@/components/VCounter/VCounter.types'
import type { VDataIterator as VDataIteratorSource } from '@/components/VDataIterator/VDataIterator'
import type { VDataIterator as VDataIteratorTypes } from '@/components/VDataIterator/VDataIterator.types'
import type { VDataTable as VDataTableSource } from '@/components/VDataTable/VDataTable'
import type { VDataTable as VDataTableTypes } from '@/components/VDataTable/VDataTable.types'
import type { VDataTableFooter as VDataTableFooterSource } from '@/components/VDataTable/VDataTableFooter'
import type { VDataTableFooter as VDataTableFooterTypes } from '@/components/VDataTable/VDataTableFooter.types'
import type { VDataTableHeaders as VDataTableHeadersSource } from '@/components/VDataTable/VDataTableHeaders'
import type { VDataTableHeaders as VDataTableHeadersTypes } from '@/components/VDataTable/VDataTableHeaders.types'
import type { VDataTableRow as VDataTableRowSource } from '@/components/VDataTable/VDataTableRow'
import type { VDataTableRow as VDataTableRowTypes } from '@/components/VDataTable/VDataTableRow.types'
import type { VDataTableRows as VDataTableRowsSource } from '@/components/VDataTable/VDataTableRows'
import type { VDataTableRows as VDataTableRowsTypes } from '@/components/VDataTable/VDataTableRows.types'
import type { VDataTableServer as VDataTableServerSource } from '@/components/VDataTable/VDataTableServer'
import type { VDataTableServer as VDataTableServerTypes } from '@/components/VDataTable/VDataTableServer.types'
import type { VDataTableVirtual as VDataTableVirtualSource } from '@/components/VDataTable/VDataTableVirtual'
import type { VDataTableVirtual as VDataTableVirtualTypes } from '@/components/VDataTable/VDataTableVirtual.types'
import type { VDateInput as VDateInputSource } from '@/components/VDateInput/VDateInput'
import type { VDateInput as VDateInputTypes } from '@/components/VDateInput/VDateInput.types'
import type { VDatePicker as VDatePickerSource } from '@/components/VDatePicker/VDatePicker'
import type { VDatePicker as VDatePickerTypes } from '@/components/VDatePicker/VDatePicker.types'
import type { VDatePickerControls as VDatePickerControlsSource } from '@/components/VDatePicker/VDatePickerControls'
import type { VDatePickerControls as VDatePickerControlsTypes } from '@/components/VDatePicker/VDatePickerControls.types'
import type { VDatePickerHeader as VDatePickerHeaderSource } from '@/components/VDatePicker/VDatePickerHeader'
import type { VDatePickerHeader as VDatePickerHeaderTypes } from '@/components/VDatePicker/VDatePickerHeader.types'
import type { VDatePickerMonth as VDatePickerMonthSource } from '@/components/VDatePicker/VDatePickerMonth'
import type { VDatePickerMonth as VDatePickerMonthTypes } from '@/components/VDatePicker/VDatePickerMonth.types'
import type { VDatePickerMonths as VDatePickerMonthsSource } from '@/components/VDatePicker/VDatePickerMonths'
import type { VDatePickerMonths as VDatePickerMonthsTypes } from '@/components/VDatePicker/VDatePickerMonths.types'
import type { VDatePickerYears as VDatePickerYearsSource } from '@/components/VDatePicker/VDatePickerYears'
import type { VDatePickerYears as VDatePickerYearsTypes } from '@/components/VDatePicker/VDatePickerYears.types'
import type { VDefaultsProvider as VDefaultsProviderSource } from '@/components/VDefaultsProvider/VDefaultsProvider'
import type { VDefaultsProvider as VDefaultsProviderTypes } from '@/components/VDefaultsProvider/VDefaultsProvider.types'
import type { VDialog as VDialogSource } from '@/components/VDialog/VDialog'
import type { VDialog as VDialogTypes } from '@/components/VDialog/VDialog.types'
import type { VDivider as VDividerSource } from '@/components/VDivider/VDivider'
import type { VDivider as VDividerTypes } from '@/components/VDivider/VDivider.types'
import type { VEmptyState as VEmptyStateSource } from '@/components/VEmptyState/VEmptyState'
import type { VEmptyState as VEmptyStateTypes } from '@/components/VEmptyState/VEmptyState.types'
import type { VExpansionPanel as VExpansionPanelSource } from '@/components/VExpansionPanel/VExpansionPanel'
import type { VExpansionPanel as VExpansionPanelTypes } from '@/components/VExpansionPanel/VExpansionPanel.types'
import type { VExpansionPanels as VExpansionPanelsSource } from '@/components/VExpansionPanel/VExpansionPanels'
import type { VExpansionPanels as VExpansionPanelsTypes } from '@/components/VExpansionPanel/VExpansionPanels.types'
import type { VExpansionPanelText as VExpansionPanelTextSource } from '@/components/VExpansionPanel/VExpansionPanelText'
import type { VExpansionPanelText as VExpansionPanelTextTypes } from '@/components/VExpansionPanel/VExpansionPanelText.types'
import type { VExpansionPanelTitle as VExpansionPanelTitleSource } from '@/components/VExpansionPanel/VExpansionPanelTitle'
import type { VExpansionPanelTitle as VExpansionPanelTitleTypes } from '@/components/VExpansionPanel/VExpansionPanelTitle.types'
import type { VFab as VFabSource } from '@/components/VFab/VFab'
import type { VFab as VFabTypes } from '@/components/VFab/VFab.types'
import type { VField as VFieldSource } from '@/components/VField/VField'
import type { VField as VFieldTypes } from '@/components/VField/VField.types'
import type { VFieldLabel as VFieldLabelSource } from '@/components/VField/VFieldLabel'
import type { VFieldLabel as VFieldLabelTypes } from '@/components/VField/VFieldLabel.types'
import type { VFileInput as VFileInputSource } from '@/components/VFileInput/VFileInput'
import type { VFileInput as VFileInputTypes } from '@/components/VFileInput/VFileInput.types'
import type { VFileUpload as VFileUploadSource } from '@/components/VFileUpload/VFileUpload'
import type { VFileUpload as VFileUploadTypes } from '@/components/VFileUpload/VFileUpload.types'
import type { VFileUploadDropzone as VFileUploadDropzoneSource } from '@/components/VFileUpload/VFileUploadDropzone'
import type { VFileUploadDropzone as VFileUploadDropzoneTypes } from '@/components/VFileUpload/VFileUploadDropzone.types'
import type { VFileUploadItem as VFileUploadItemSource } from '@/components/VFileUpload/VFileUploadItem'
import type { VFileUploadItem as VFileUploadItemTypes } from '@/components/VFileUpload/VFileUploadItem.types'
import type { VFileUploadList as VFileUploadListSource } from '@/components/VFileUpload/VFileUploadList'
import type { VFileUploadList as VFileUploadListTypes } from '@/components/VFileUpload/VFileUploadList.types'
import type { VFooter as VFooterSource } from '@/components/VFooter/VFooter'
import type { VFooter as VFooterTypes } from '@/components/VFooter/VFooter.types'
import type { VForm as VFormSource } from '@/components/VForm/VForm'
import type { VForm as VFormTypes } from '@/components/VForm/VForm.types'
import type { VCol as VColSource } from '@/components/VGrid/VCol'
import type { VCol as VColTypes } from '@/components/VGrid/VCol.types'
import type { VContainer as VContainerSource } from '@/components/VGrid/VContainer'
import type { VContainer as VContainerTypes } from '@/components/VGrid/VContainer.types'
import type { VRow as VRowSource } from '@/components/VGrid/VRow'
import type { VRow as VRowTypes } from '@/components/VGrid/VRow.types'
import type { VSpacer as VSpacerSource } from '@/components/VGrid/VSpacer'
import type { VSpacer as VSpacerTypes } from '@/components/VGrid/VSpacer.types'
import type { VHighlight as VHighlightSource } from '@/components/VHighlight/VHighlight'
import type { VHighlight as VHighlightTypes } from '@/components/VHighlight/VHighlight.types'
import type { VHotkey as VHotkeySource } from '@/components/VHotkey/VHotkey'
import type { VHotkey as VHotkeyTypes } from '@/components/VHotkey/VHotkey.types'
import type { VHover as VHoverSource } from '@/components/VHover/VHover'
import type { VHover as VHoverTypes } from '@/components/VHover/VHover.types'
import type { VIcon as VIconSource } from '@/components/VIcon/VIcon'
import type { VIcon as VIconTypes } from '@/components/VIcon/VIcon.types'
import type { VIconBtn as VIconBtnSource } from '@/components/VIconBtn/VIconBtn'
import type { VIconBtn as VIconBtnTypes } from '@/components/VIconBtn/VIconBtn.types'
import type { VImg as VImgSource } from '@/components/VImg/VImg'
import type { VImg as VImgTypes } from '@/components/VImg/VImg.types'
import type { VInfiniteScroll as VInfiniteScrollSource } from '@/components/VInfiniteScroll/VInfiniteScroll'
import type { VInfiniteScroll as VInfiniteScrollTypes } from '@/components/VInfiniteScroll/VInfiniteScroll.types'
import type { VInput as VInputSource } from '@/components/VInput/VInput'
import type { VInput as VInputTypes } from '@/components/VInput/VInput.types'
import type { VItem as VItemSource } from '@/components/VItemGroup/VItem'
import type { VItem as VItemTypes } from '@/components/VItemGroup/VItem.types'
import type { VItemGroup as VItemGroupSource } from '@/components/VItemGroup/VItemGroup'
import type { VItemGroup as VItemGroupTypes } from '@/components/VItemGroup/VItemGroup.types'
import type { VKbd as VKbdSource } from '@/components/VKbd/VKbd'
import type { VKbd as VKbdTypes } from '@/components/VKbd/VKbd.types'
import type { VLabel as VLabelSource } from '@/components/VLabel/VLabel'
import type { VLabel as VLabelTypes } from '@/components/VLabel/VLabel.types'
import type { VLayout as VLayoutSource } from '@/components/VLayout/VLayout'
import type { VLayout as VLayoutTypes } from '@/components/VLayout/VLayout.types'
import type { VLayoutItem as VLayoutItemSource } from '@/components/VLayout/VLayoutItem'
import type { VLayoutItem as VLayoutItemTypes } from '@/components/VLayout/VLayoutItem.types'
import type { VLazy as VLazySource } from '@/components/VLazy/VLazy'
import type { VLazy as VLazyTypes } from '@/components/VLazy/VLazy.types'
import type { VList as VListSource } from '@/components/VList/VList'
import type { VList as VListTypes } from '@/components/VList/VList.types'
import type { VListGroup as VListGroupSource } from '@/components/VList/VListGroup'
import type { VListGroup as VListGroupTypes } from '@/components/VList/VListGroup.types'
import type { VListImg as VListImgSource } from '@/components/VList/VListImg'
import type { VListImg as VListImgTypes } from '@/components/VList/VListImg.types'
import type { VListItem as VListItemSource } from '@/components/VList/VListItem'
import type { VListItem as VListItemTypes } from '@/components/VList/VListItem.types'
import type { VListItemAction as VListItemActionSource } from '@/components/VList/VListItemAction'
import type { VListItemAction as VListItemActionTypes } from '@/components/VList/VListItemAction.types'
import type { VListItemMedia as VListItemMediaSource } from '@/components/VList/VListItemMedia'
import type { VListItemMedia as VListItemMediaTypes } from '@/components/VList/VListItemMedia.types'
import type { VListItemSubtitle as VListItemSubtitleSource } from '@/components/VList/VListItemSubtitle'
import type { VListItemSubtitle as VListItemSubtitleTypes } from '@/components/VList/VListItemSubtitle.types'
import type { VListItemTitle as VListItemTitleSource } from '@/components/VList/VListItemTitle'
import type { VListItemTitle as VListItemTitleTypes } from '@/components/VList/VListItemTitle.types'
import type { VListSubheader as VListSubheaderSource } from '@/components/VList/VListSubheader'
import type { VListSubheader as VListSubheaderTypes } from '@/components/VList/VListSubheader.types'
import type { VLocaleProvider as VLocaleProviderSource } from '@/components/VLocaleProvider/VLocaleProvider'
import type { VLocaleProvider as VLocaleProviderTypes } from '@/components/VLocaleProvider/VLocaleProvider.types'
import type { VMain as VMainSource } from '@/components/VMain/VMain'
import type { VMain as VMainTypes } from '@/components/VMain/VMain.types'
import type { VMenu as VMenuSource } from '@/components/VMenu/VMenu'
import type { VMenu as VMenuTypes } from '@/components/VMenu/VMenu.types'
import type { VMessages as VMessagesSource } from '@/components/VMessages/VMessages'
import type { VMessages as VMessagesTypes } from '@/components/VMessages/VMessages.types'
import type { VNavigationDrawer as VNavigationDrawerSource } from '@/components/VNavigationDrawer/VNavigationDrawer'
import type { VNavigationDrawer as VNavigationDrawerTypes } from '@/components/VNavigationDrawer/VNavigationDrawer.types'
import type { VNoSsr as VNoSsrSource } from '@/components/VNoSsr/VNoSsr'
import type { VNoSsr as VNoSsrTypes } from '@/components/VNoSsr/VNoSsr.types'
import type { VNumberInput as VNumberInputSource } from '@/components/VNumberInput/VNumberInput'
import type { VNumberInput as VNumberInputTypes } from '@/components/VNumberInput/VNumberInput.types'
import type { VOtpField as VOtpFieldSource } from '@/components/VOtpInput/VOtpField'
import type { VOtpField as VOtpFieldTypes } from '@/components/VOtpInput/VOtpField.types'
import type { VOtpGroup as VOtpGroupSource } from '@/components/VOtpInput/VOtpGroup'
import type { VOtpGroup as VOtpGroupTypes } from '@/components/VOtpInput/VOtpGroup.types'
import type { VOtpInput as VOtpInputSource } from '@/components/VOtpInput/VOtpInput'
import type { VOtpInput as VOtpInputTypes } from '@/components/VOtpInput/VOtpInput.types'
import type { VOtpSeparator as VOtpSeparatorSource } from '@/components/VOtpInput/VOtpSeparator'
import type { VOtpSeparator as VOtpSeparatorTypes } from '@/components/VOtpInput/VOtpSeparator.types'
import type { VOverlay as VOverlaySource } from '@/components/VOverlay/VOverlay'
import type { VOverlay as VOverlayTypes } from '@/components/VOverlay/VOverlay.types'
import type { VPagination as VPaginationSource } from '@/components/VPagination/VPagination'
import type { VPagination as VPaginationTypes } from '@/components/VPagination/VPagination.types'
import type { VParallax as VParallaxSource } from '@/components/VParallax/VParallax'
import type { VParallax as VParallaxTypes } from '@/components/VParallax/VParallax.types'
import type { VPicker as VPickerSource } from '@/components/VPicker/VPicker'
import type { VPicker as VPickerTypes } from '@/components/VPicker/VPicker.types'
import type { VPickerTitle as VPickerTitleSource } from '@/components/VPicker/VPickerTitle'
import type { VPickerTitle as VPickerTitleTypes } from '@/components/VPicker/VPickerTitle.types'
import type { VProgress as VProgressSource } from '@/components/VProgress/VProgress'
import type { VProgress as VProgressTypes } from '@/components/VProgress/VProgress.types'
import type { VProgressCircular as VProgressCircularSource } from '@/components/VProgressCircular/VProgressCircular'
import type { VProgressCircular as VProgressCircularTypes } from '@/components/VProgressCircular/VProgressCircular.types'
import type { VProgressLinear as VProgressLinearSource } from '@/components/VProgressLinear/VProgressLinear'
import type { VProgressLinear as VProgressLinearTypes } from '@/components/VProgressLinear/VProgressLinear.types'
import type { VPullToRefresh as VPullToRefreshSource } from '@/components/VPullToRefresh/VPullToRefresh'
import type { VPullToRefresh as VPullToRefreshTypes } from '@/components/VPullToRefresh/VPullToRefresh.types'
import type { VRadio as VRadioSource } from '@/components/VRadio/VRadio'
import type { VRadio as VRadioTypes } from '@/components/VRadio/VRadio.types'
import type { VRadioGroup as VRadioGroupSource } from '@/components/VRadioGroup/VRadioGroup'
import type { VRadioGroup as VRadioGroupTypes } from '@/components/VRadioGroup/VRadioGroup.types'
import type { VRangeSlider as VRangeSliderSource } from '@/components/VRangeSlider/VRangeSlider'
import type { VRangeSlider as VRangeSliderTypes } from '@/components/VRangeSlider/VRangeSlider.types'
import type { VRating as VRatingSource } from '@/components/VRating/VRating'
import type { VRating as VRatingTypes } from '@/components/VRating/VRating.types'
import type { VResponsive as VResponsiveSource } from '@/components/VResponsive/VResponsive'
import type { VResponsive as VResponsiveTypes } from '@/components/VResponsive/VResponsive.types'
import type { VSelect as VSelectSource } from '@/components/VSelect/VSelect'
import type { VSelect as VSelectTypes } from '@/components/VSelect/VSelect.types'
import type { VSelectionControl as VSelectionControlSource } from '@/components/VSelectionControl/VSelectionControl'
import type { VSelectionControl as VSelectionControlTypes } from '@/components/VSelectionControl/VSelectionControl.types'
import type { VSelectionControlGroup as VSelectionControlGroupSource } from '@/components/VSelectionControlGroup/VSelectionControlGroup'
import type { VSelectionControlGroup as VSelectionControlGroupTypes } from '@/components/VSelectionControlGroup/VSelectionControlGroup.types'
import type { VSheet as VSheetSource } from '@/components/VSheet/VSheet'
import type { VSheet as VSheetTypes } from '@/components/VSheet/VSheet.types'
import type { VSkeletonLoader as VSkeletonLoaderSource } from '@/components/VSkeletonLoader/VSkeletonLoader'
import type { VSkeletonLoader as VSkeletonLoaderTypes } from '@/components/VSkeletonLoader/VSkeletonLoader.types'
import type { VSlideGroup as VSlideGroupSource } from '@/components/VSlideGroup/VSlideGroup'
import type { VSlideGroup as VSlideGroupTypes } from '@/components/VSlideGroup/VSlideGroup.types'
import type { VSlideGroupItem as VSlideGroupItemSource } from '@/components/VSlideGroup/VSlideGroupItem'
import type { VSlideGroupItem as VSlideGroupItemTypes } from '@/components/VSlideGroup/VSlideGroupItem.types'
import type { VSlider as VSliderSource } from '@/components/VSlider/VSlider'
import type { VSlider as VSliderTypes } from '@/components/VSlider/VSlider.types'
import type { VSnackbar as VSnackbarSource } from '@/components/VSnackbar/VSnackbar'
import type { VSnackbar as VSnackbarTypes } from '@/components/VSnackbar/VSnackbar.types'
import type { VSnackbarQueue as VSnackbarQueueSource } from '@/components/VSnackbarQueue/VSnackbarQueue'
import type { VSnackbarQueue as VSnackbarQueueTypes } from '@/components/VSnackbarQueue/VSnackbarQueue.types'
import type { VSparkline as VSparklineSource } from '@/components/VSparkline/VSparkline'
import type { VSparkline as VSparklineTypes } from '@/components/VSparkline/VSparkline.types'
import type { VSparklineTooltip as VSparklineTooltipSource } from '@/components/VSparkline/VSparklineTooltip'
import type { VSparklineTooltip as VSparklineTooltipTypes } from '@/components/VSparkline/VSparklineTooltip.types'
import type { VSpeedDial as VSpeedDialSource } from '@/components/VSpeedDial/VSpeedDial'
import type { VSpeedDial as VSpeedDialTypes } from '@/components/VSpeedDial/VSpeedDial.types'
import type { VStepper as VStepperSource } from '@/components/VStepper/VStepper'
import type { VStepper as VStepperTypes } from '@/components/VStepper/VStepper.types'
import type { VStepperActions as VStepperActionsSource } from '@/components/VStepper/VStepperActions'
import type { VStepperActions as VStepperActionsTypes } from '@/components/VStepper/VStepperActions.types'
import type { VStepperHeader as VStepperHeaderSource } from '@/components/VStepper/VStepperHeader'
import type { VStepperHeader as VStepperHeaderTypes } from '@/components/VStepper/VStepperHeader.types'
import type { VStepperItem as VStepperItemSource } from '@/components/VStepper/VStepperItem'
import type { VStepperItem as VStepperItemTypes } from '@/components/VStepper/VStepperItem.types'
import type { VStepperWindow as VStepperWindowSource } from '@/components/VStepper/VStepperWindow'
import type { VStepperWindow as VStepperWindowTypes } from '@/components/VStepper/VStepperWindow.types'
import type { VStepperWindowItem as VStepperWindowItemSource } from '@/components/VStepper/VStepperWindowItem'
import type { VStepperWindowItem as VStepperWindowItemTypes } from '@/components/VStepper/VStepperWindowItem.types'
import type { VStepperVertical as VStepperVerticalSource } from '@/components/VStepperVertical/VStepperVertical'
import type { VStepperVertical as VStepperVerticalTypes } from '@/components/VStepperVertical/VStepperVertical.types'
import type { VStepperVerticalActions as VStepperVerticalActionsSource } from '@/components/VStepperVertical/VStepperVerticalActions'
import type { VStepperVerticalActions as VStepperVerticalActionsTypes } from '@/components/VStepperVertical/VStepperVerticalActions.types'
import type { VStepperVerticalItem as VStepperVerticalItemSource } from '@/components/VStepperVertical/VStepperVerticalItem'
import type { VStepperVerticalItem as VStepperVerticalItemTypes } from '@/components/VStepperVertical/VStepperVerticalItem.types'
import type { VSwitch as VSwitchSource } from '@/components/VSwitch/VSwitch'
import type { VSwitch as VSwitchTypes } from '@/components/VSwitch/VSwitch.types'
import type { VSystemBar as VSystemBarSource } from '@/components/VSystemBar/VSystemBar'
import type { VSystemBar as VSystemBarTypes } from '@/components/VSystemBar/VSystemBar.types'
import type { VTable as VTableSource } from '@/components/VTable/VTable'
import type { VTable as VTableTypes } from '@/components/VTable/VTable.types'
import type { VTab as VTabSource } from '@/components/VTabs/VTab'
import type { VTab as VTabTypes } from '@/components/VTabs/VTab.types'
import type { VTabs as VTabsSource } from '@/components/VTabs/VTabs'
import type { VTabs as VTabsTypes } from '@/components/VTabs/VTabs.types'
import type { VTabsWindow as VTabsWindowSource } from '@/components/VTabs/VTabsWindow'
import type { VTabsWindow as VTabsWindowTypes } from '@/components/VTabs/VTabsWindow.types'
import type { VTabsWindowItem as VTabsWindowItemSource } from '@/components/VTabs/VTabsWindowItem'
import type { VTabsWindowItem as VTabsWindowItemTypes } from '@/components/VTabs/VTabsWindowItem.types'
import type { VTextarea as VTextareaSource } from '@/components/VTextarea/VTextarea'
import type { VTextarea as VTextareaTypes } from '@/components/VTextarea/VTextarea.types'
import type { VTextField as VTextFieldSource } from '@/components/VTextField/VTextField'
import type { VTextField as VTextFieldTypes } from '@/components/VTextField/VTextField.types'
import type { VThemeProvider as VThemeProviderSource } from '@/components/VThemeProvider/VThemeProvider'
import type { VThemeProvider as VThemeProviderTypes } from '@/components/VThemeProvider/VThemeProvider.types'
import type { VTimeline as VTimelineSource } from '@/components/VTimeline/VTimeline'
import type { VTimeline as VTimelineTypes } from '@/components/VTimeline/VTimeline.types'
import type { VTimelineItem as VTimelineItemSource } from '@/components/VTimeline/VTimelineItem'
import type { VTimelineItem as VTimelineItemTypes } from '@/components/VTimeline/VTimelineItem.types'
import type { VTimePicker as VTimePickerSource } from '@/components/VTimePicker/VTimePicker'
import type { VTimePicker as VTimePickerTypes } from '@/components/VTimePicker/VTimePicker.types'
import type { VTimePickerClock as VTimePickerClockSource } from '@/components/VTimePicker/VTimePickerClock'
import type { VTimePickerClock as VTimePickerClockTypes } from '@/components/VTimePicker/VTimePickerClock.types'
import type { VTimePickerControls as VTimePickerControlsSource } from '@/components/VTimePicker/VTimePickerControls'
import type { VTimePickerControls as VTimePickerControlsTypes } from '@/components/VTimePicker/VTimePickerControls.types'
import type { VToolbar as VToolbarSource } from '@/components/VToolbar/VToolbar'
import type { VToolbar as VToolbarTypes } from '@/components/VToolbar/VToolbar.types'
import type { VToolbarItems as VToolbarItemsSource } from '@/components/VToolbar/VToolbarItems'
import type { VToolbarItems as VToolbarItemsTypes } from '@/components/VToolbar/VToolbarItems.types'
import type { VToolbarTitle as VToolbarTitleSource } from '@/components/VToolbar/VToolbarTitle'
import type { VToolbarTitle as VToolbarTitleTypes } from '@/components/VToolbar/VToolbarTitle.types'
import type { VTooltip as VTooltipSource } from '@/components/VTooltip/VTooltip'
import type { VTooltip as VTooltipTypes } from '@/components/VTooltip/VTooltip.types'
import type { VTreeview as VTreeviewSource } from '@/components/VTreeview/VTreeview'
import type { VTreeview as VTreeviewTypes } from '@/components/VTreeview/VTreeview.types'
import type { VTreeviewGroup as VTreeviewGroupSource } from '@/components/VTreeview/VTreeviewGroup'
import type { VTreeviewGroup as VTreeviewGroupTypes } from '@/components/VTreeview/VTreeviewGroup.types'
import type { VTreeviewItem as VTreeviewItemSource } from '@/components/VTreeview/VTreeviewItem'
import type { VTreeviewItem as VTreeviewItemTypes } from '@/components/VTreeview/VTreeviewItem.types'
import type { VValidation as VValidationSource } from '@/components/VValidation/VValidation'
import type { VValidation as VValidationTypes } from '@/components/VValidation/VValidation.types'
import type { VVirtualScroll as VVirtualScrollSource } from '@/components/VVirtualScroll/VVirtualScroll'
import type { VVirtualScroll as VVirtualScrollTypes } from '@/components/VVirtualScroll/VVirtualScroll.types'
import type { VWindow as VWindowSource } from '@/components/VWindow/VWindow'
import type { VWindow as VWindowTypes } from '@/components/VWindow/VWindow.types'
import type { VWindowItem as VWindowItemSource } from '@/components/VWindow/VWindowItem'
import type { VWindowItem as VWindowItemTypes } from '@/components/VWindow/VWindowItem.types'
import type { VClassIcon as VClassIconSource, VComponentIcon as VComponentIconSource, VLigatureIcon as VLigatureIconSource, VSvgIcon as VSvgIconSource } from '@/composables/icons'
import type { VClassIcon as VClassIconTypes, VComponentIcon as VComponentIconTypes, VLigatureIcon as VLigatureIconTypes, VSvgIcon as VSvgIconTypes } from '@/composables/icons.types'
import type { VAudio as VAudioSource } from '@/labs/VAudio/VAudio'
import type { VAudio as VAudioTypes } from '@/labs/VAudio/VAudio.types'
import type { VAudioControls as VAudioControlsSource } from '@/labs/VAudio/VAudioControls'
import type { VAudioControls as VAudioControlsTypes } from '@/labs/VAudio/VAudioControls.types'
import type { VAudioWaveform as VAudioWaveformSource } from '@/labs/VAudio/VAudioWaveform'
import type { VAudioWaveform as VAudioWaveformTypes } from '@/labs/VAudio/VAudioWaveform.types'
import type { VCommandPalette as VCommandPaletteSource } from '@/labs/VCommandPalette/VCommandPalette'
import type { VCommandPalette as VCommandPaletteTypes } from '@/labs/VCommandPalette/VCommandPalette.types'
import type { VCommandPaletteItem as VCommandPaletteItemSource } from '@/labs/VCommandPalette/VCommandPaletteItem'
import type { VCommandPaletteItem as VCommandPaletteItemTypes } from '@/labs/VCommandPalette/VCommandPaletteItem.types'
import type { VDateRangePicker as VDateRangePickerSource } from '@/labs/VDateRangePicker/VDateRangePicker'
import type { VDateRangePicker as VDateRangePickerTypes } from '@/labs/VDateRangePicker/VDateRangePicker.types'
import type { VHeatmap as VHeatmapSource } from '@/labs/VHeatmap/VHeatmap'
import type { VHeatmap as VHeatmapTypes } from '@/labs/VHeatmap/VHeatmap.types'
import type { VHeatmapCell as VHeatmapCellSource } from '@/labs/VHeatmap/VHeatmapCell'
import type { VHeatmapCell as VHeatmapCellTypes } from '@/labs/VHeatmap/VHeatmapCell.types'
import type { VHeatmapLegend as VHeatmapLegendSource } from '@/labs/VHeatmap/VHeatmapLegend'
import type { VHeatmapLegend as VHeatmapLegendTypes } from '@/labs/VHeatmap/VHeatmapLegend.types'
import type { VHeatmapLegendCell as VHeatmapLegendCellSource } from '@/labs/VHeatmap/VHeatmapLegendCell'
import type { VHeatmapLegendCell as VHeatmapLegendCellTypes } from '@/labs/VHeatmap/VHeatmapLegendCell.types'
import type { VInfiniteCarousel as VInfiniteCarouselSource } from '@/labs/VInfiniteCarousel/VInfiniteCarousel'
import type { VInfiniteCarousel as VInfiniteCarouselTypes } from '@/labs/VInfiniteCarousel/VInfiniteCarousel.types'
import type { VLoadingIndicator as VLoadingIndicatorSource } from '@/labs/VLoadingIndicator/VLoadingIndicator'
import type { VLoadingIndicator as VLoadingIndicatorTypes } from '@/labs/VLoadingIndicator/VLoadingIndicator.types'
import type { VMaskInput as VMaskInputSource } from '@/labs/VMaskInput/VMaskInput'
import type { VMaskInput as VMaskInputTypes } from '@/labs/VMaskInput/VMaskInput.types'
import type { VMediaProgressBar as VMediaProgressBarSource } from '@/labs/VMediaProgressBar/VMediaProgressBar'
import type { VMediaProgressBar as VMediaProgressBarTypes } from '@/labs/VMediaProgressBar/VMediaProgressBar.types'
import type { VMediaVolume as VMediaVolumeSource } from '@/labs/VMediaVolume/VMediaVolume'
import type { VMediaVolume as VMediaVolumeTypes } from '@/labs/VMediaVolume/VMediaVolume.types'
import type { VMonthPicker as VMonthPickerSource } from '@/labs/VMonthPicker/VMonthPicker'
import type { VMonthPicker as VMonthPickerTypes } from '@/labs/VMonthPicker/VMonthPicker.types'
import type { VPie as VPieSource } from '@/labs/VPie/VPie'
import type { VPie as VPieTypes } from '@/labs/VPie/VPie.types'
import type { VPieSegment as VPieSegmentSource } from '@/labs/VPie/VPieSegment'
import type { VPieSegment as VPieSegmentTypes } from '@/labs/VPie/VPieSegment.types'
import type { VPieTooltip as VPieTooltipSource } from '@/labs/VPie/VPieTooltip'
import type { VPieTooltip as VPieTooltipTypes } from '@/labs/VPie/VPieTooltip.types'
import type { VSplitBtn as VSplitBtnSource } from '@/labs/VSplitBtn/VSplitBtn'
import type { VSplitBtn as VSplitBtnTypes } from '@/labs/VSplitBtn/VSplitBtn.types'
import type { VTimeInput as VTimeInputSource } from '@/labs/VTimeInput/VTimeInput'
import type { VTimeInput as VTimeInputTypes } from '@/labs/VTimeInput/VTimeInput.types'
import type { VVideo as VVideoSource } from '@/labs/VVideo/VVideo'
import type { VVideo as VVideoTypes } from '@/labs/VVideo/VVideo.types'
import type { VVideoControls as VVideoControlsSource } from '@/labs/VVideo/VVideoControls'
import type { VVideoControls as VVideoControlsTypes } from '@/labs/VVideo/VVideoControls.types'
import type { UnionToIntersection } from '@/util/shared.types'

type Parts<C> = {
  props: C extends ComponentOptionsBase<infer P, any, any, any, any, any, any, any> ? P : never
  exposed: C extends ComponentOptionsBase<any, infer B, any, any, any, any, any, any> ? [B] extends [void] ? {} : B extends (...args: any[]) => any ? {} : Omit<B, '_allExposed'> : never
  allExposed: C extends ComponentOptionsBase<any, infer B, any, any, any, any, any, any> ? B extends { _allExposed: infer E } ? keyof UnionToIntersection<E> : never : never
  emits: C extends ComponentOptionsBase<any, any, any, any, any, any, any, infer E> ? E : never
  defaults: C extends ComponentOptionsBase<any, any, any, any, any, any, any, any, any, infer D> ? keyof D : never
  slots: C extends ComponentOptionsBase<any, any, any, any, any, any, any, any, any, any, any, any, infer S> ? S : never
}

type PropsOf<C> = C extends new (...args: any) => { $props: infer P } ? P : never

type Check<Source, Types> =
  | (Equal<PropsOf<Types>, PropsOf<Source>> extends true ? never : '$props')
  | { [K in keyof Parts<Source>]: Equal<Parts<Types>[K], Parts<Source>[K]> extends true ? never : K }[keyof Parts<Source>]

type Checks = {
  VAlert: Check<typeof VAlertSource, typeof VAlertTypes>
  VAlertTitle: Check<typeof VAlertTitleSource, typeof VAlertTitleTypes>
  VApp: Check<typeof VAppSource, typeof VAppTypes>
  VAppBar: Check<typeof VAppBarSource, typeof VAppBarTypes>
  VAppBarNavIcon: Check<typeof VAppBarNavIconSource, typeof VAppBarNavIconTypes>
  VAppBarTitle: Check<typeof VAppBarTitleSource, typeof VAppBarTitleTypes>
  VAudio: Check<typeof VAudioSource, typeof VAudioTypes>
  VAudioControls: Check<typeof VAudioControlsSource, typeof VAudioControlsTypes>
  VAudioWaveform: Check<typeof VAudioWaveformSource, typeof VAudioWaveformTypes>
  VAutocomplete: Check<typeof VAutocompleteSource, typeof VAutocompleteTypes>
  VAvatar: Check<typeof VAvatarSource, typeof VAvatarTypes>
  VAvatarGroup: Check<typeof VAvatarGroupSource, typeof VAvatarGroupTypes>
  VBadge: Check<typeof VBadgeSource, typeof VBadgeTypes>
  VBanner: Check<typeof VBannerSource, typeof VBannerTypes>
  VBannerActions: Check<typeof VBannerActionsSource, typeof VBannerActionsTypes>
  VBannerText: Check<typeof VBannerTextSource, typeof VBannerTextTypes>
  VBottomNavigation: Check<typeof VBottomNavigationSource, typeof VBottomNavigationTypes>
  VBottomSheet: Check<typeof VBottomSheetSource, typeof VBottomSheetTypes>
  VBreadcrumbs: Check<typeof VBreadcrumbsSource, typeof VBreadcrumbsTypes>
  VBreadcrumbsDivider: Check<typeof VBreadcrumbsDividerSource, typeof VBreadcrumbsDividerTypes>
  VBreadcrumbsItem: Check<typeof VBreadcrumbsItemSource, typeof VBreadcrumbsItemTypes>
  VBtn: Check<typeof VBtnSource, typeof VBtnTypes>
  VBtnGroup: Check<typeof VBtnGroupSource, typeof VBtnGroupTypes>
  VBtnToggle: Check<typeof VBtnToggleSource, typeof VBtnToggleTypes>
  VCalendar: Check<typeof VCalendarSource, typeof VCalendarTypes>
  VCard: Check<typeof VCardSource, typeof VCardTypes>
  VCardActions: Check<typeof VCardActionsSource, typeof VCardActionsTypes>
  VCardItem: Check<typeof VCardItemSource, typeof VCardItemTypes>
  VCardSubtitle: Check<typeof VCardSubtitleSource, typeof VCardSubtitleTypes>
  VCardText: Check<typeof VCardTextSource, typeof VCardTextTypes>
  VCardTitle: Check<typeof VCardTitleSource, typeof VCardTitleTypes>
  VCarousel: Check<typeof VCarouselSource, typeof VCarouselTypes>
  VCarouselItem: Check<typeof VCarouselItemSource, typeof VCarouselItemTypes>
  VCheckbox: Check<typeof VCheckboxSource, typeof VCheckboxTypes>
  VCheckboxBtn: Check<typeof VCheckboxBtnSource, typeof VCheckboxBtnTypes>
  VChip: Check<typeof VChipSource, typeof VChipTypes>
  VChipGroup: Check<typeof VChipGroupSource, typeof VChipGroupTypes>
  VClassIcon: Check<typeof VClassIconSource, typeof VClassIconTypes>
  VCode: Check<typeof VCodeSource, typeof VCodeTypes>
  VCol: Check<typeof VColSource, typeof VColTypes>
  VColorInput: Check<typeof VColorInputSource, typeof VColorInputTypes>
  VColorPicker: Check<typeof VColorPickerSource, typeof VColorPickerTypes>
  VCombobox: Check<typeof VComboboxSource, typeof VComboboxTypes>
  VCommandPalette: Check<typeof VCommandPaletteSource, typeof VCommandPaletteTypes>
  VCommandPaletteItem: Check<typeof VCommandPaletteItemSource, typeof VCommandPaletteItemTypes>
  VComponentIcon: Check<typeof VComponentIconSource, typeof VComponentIconTypes>
  VConfirmEdit: Check<typeof VConfirmEditSource, typeof VConfirmEditTypes>
  VContainer: Check<typeof VContainerSource, typeof VContainerTypes>
  VCounter: Check<typeof VCounterSource, typeof VCounterTypes>
  VDataIterator: Check<typeof VDataIteratorSource, typeof VDataIteratorTypes>
  VDataTable: Check<typeof VDataTableSource, typeof VDataTableTypes>
  VDataTableFooter: Check<typeof VDataTableFooterSource, typeof VDataTableFooterTypes>
  VDataTableHeaders: Check<typeof VDataTableHeadersSource, typeof VDataTableHeadersTypes>
  VDataTableRow: Check<typeof VDataTableRowSource, typeof VDataTableRowTypes>
  VDataTableRows: Check<typeof VDataTableRowsSource, typeof VDataTableRowsTypes>
  VDataTableServer: Check<typeof VDataTableServerSource, typeof VDataTableServerTypes>
  VDataTableVirtual: Check<typeof VDataTableVirtualSource, typeof VDataTableVirtualTypes>
  VDateInput: Check<typeof VDateInputSource, typeof VDateInputTypes>
  VDatePicker: Check<typeof VDatePickerSource, typeof VDatePickerTypes>
  VDatePickerControls: Check<typeof VDatePickerControlsSource, typeof VDatePickerControlsTypes>
  VDatePickerHeader: Check<typeof VDatePickerHeaderSource, typeof VDatePickerHeaderTypes>
  VDatePickerMonth: Check<typeof VDatePickerMonthSource, typeof VDatePickerMonthTypes>
  VDatePickerMonths: Check<typeof VDatePickerMonthsSource, typeof VDatePickerMonthsTypes>
  VDatePickerYears: Check<typeof VDatePickerYearsSource, typeof VDatePickerYearsTypes>
  VDateRangePicker: Check<typeof VDateRangePickerSource, typeof VDateRangePickerTypes>
  VDefaultsProvider: Check<typeof VDefaultsProviderSource, typeof VDefaultsProviderTypes>
  VDialog: Check<typeof VDialogSource, typeof VDialogTypes>
  VDialogBottomTransition: Check<typeof VDialogBottomTransitionSource, typeof VDialogBottomTransitionTypes>
  VDialogTopTransition: Check<typeof VDialogTopTransitionSource, typeof VDialogTopTransitionTypes>
  VDialogTransition: Check<typeof VDialogTransitionSource, typeof VDialogTransitionTypes>
  VDivider: Check<typeof VDividerSource, typeof VDividerTypes>
  VEmptyState: Check<typeof VEmptyStateSource, typeof VEmptyStateTypes>
  VExpandBothTransition: Check<typeof VExpandBothTransitionSource, typeof VExpandBothTransitionTypes>
  VExpandTransition: Check<typeof VExpandTransitionSource, typeof VExpandTransitionTypes>
  VExpandXTransition: Check<typeof VExpandXTransitionSource, typeof VExpandXTransitionTypes>
  VExpansionPanel: Check<typeof VExpansionPanelSource, typeof VExpansionPanelTypes>
  VExpansionPanelText: Check<typeof VExpansionPanelTextSource, typeof VExpansionPanelTextTypes>
  VExpansionPanelTitle: Check<typeof VExpansionPanelTitleSource, typeof VExpansionPanelTitleTypes>
  VExpansionPanels: Check<typeof VExpansionPanelsSource, typeof VExpansionPanelsTypes>
  VFab: Check<typeof VFabSource, typeof VFabTypes>
  VFabTransition: Check<typeof VFabTransitionSource, typeof VFabTransitionTypes>
  VFadeTransition: Check<typeof VFadeTransitionSource, typeof VFadeTransitionTypes>
  VField: Check<typeof VFieldSource, typeof VFieldTypes>
  VFieldLabel: Check<typeof VFieldLabelSource, typeof VFieldLabelTypes>
  VFileInput: Check<typeof VFileInputSource, typeof VFileInputTypes>
  VFileUpload: Check<typeof VFileUploadSource, typeof VFileUploadTypes>
  VFileUploadDropzone: Check<typeof VFileUploadDropzoneSource, typeof VFileUploadDropzoneTypes>
  VFileUploadItem: Check<typeof VFileUploadItemSource, typeof VFileUploadItemTypes>
  VFileUploadList: Check<typeof VFileUploadListSource, typeof VFileUploadListTypes>
  VFooter: Check<typeof VFooterSource, typeof VFooterTypes>
  VForm: Check<typeof VFormSource, typeof VFormTypes>
  VHeatmap: Check<typeof VHeatmapSource, typeof VHeatmapTypes>
  VHeatmapCell: Check<typeof VHeatmapCellSource, typeof VHeatmapCellTypes>
  VHeatmapLegend: Check<typeof VHeatmapLegendSource, typeof VHeatmapLegendTypes>
  VHeatmapLegendCell: Check<typeof VHeatmapLegendCellSource, typeof VHeatmapLegendCellTypes>
  VHighlight: Check<typeof VHighlightSource, typeof VHighlightTypes>
  VHotkey: Check<typeof VHotkeySource, typeof VHotkeyTypes>
  VHover: Check<typeof VHoverSource, typeof VHoverTypes>
  VIcon: Check<typeof VIconSource, typeof VIconTypes>
  VIconBtn: Check<typeof VIconBtnSource, typeof VIconBtnTypes>
  VImg: Check<typeof VImgSource, typeof VImgTypes>
  VInfiniteCarousel: Check<typeof VInfiniteCarouselSource, typeof VInfiniteCarouselTypes>
  VInfiniteScroll: Check<typeof VInfiniteScrollSource, typeof VInfiniteScrollTypes>
  VInput: Check<typeof VInputSource, typeof VInputTypes>
  VItem: Check<typeof VItemSource, typeof VItemTypes>
  VItemGroup: Check<typeof VItemGroupSource, typeof VItemGroupTypes>
  VKbd: Check<typeof VKbdSource, typeof VKbdTypes>
  VLabel: Check<typeof VLabelSource, typeof VLabelTypes>
  VLayout: Check<typeof VLayoutSource, typeof VLayoutTypes>
  VLayoutItem: Check<typeof VLayoutItemSource, typeof VLayoutItemTypes>
  VLazy: Check<typeof VLazySource, typeof VLazyTypes>
  VLigatureIcon: Check<typeof VLigatureIconSource, typeof VLigatureIconTypes>
  VList: Check<typeof VListSource, typeof VListTypes>
  VListGroup: Check<typeof VListGroupSource, typeof VListGroupTypes>
  VListImg: Check<typeof VListImgSource, typeof VListImgTypes>
  VListItem: Check<typeof VListItemSource, typeof VListItemTypes>
  VListItemAction: Check<typeof VListItemActionSource, typeof VListItemActionTypes>
  VListItemMedia: Check<typeof VListItemMediaSource, typeof VListItemMediaTypes>
  VListItemSubtitle: Check<typeof VListItemSubtitleSource, typeof VListItemSubtitleTypes>
  VListItemTitle: Check<typeof VListItemTitleSource, typeof VListItemTitleTypes>
  VListSubheader: Check<typeof VListSubheaderSource, typeof VListSubheaderTypes>
  VLoadingIndicator: Check<typeof VLoadingIndicatorSource, typeof VLoadingIndicatorTypes>
  VLocaleProvider: Check<typeof VLocaleProviderSource, typeof VLocaleProviderTypes>
  VMain: Check<typeof VMainSource, typeof VMainTypes>
  VMaskInput: Check<typeof VMaskInputSource, typeof VMaskInputTypes>
  VMediaProgressBar: Check<typeof VMediaProgressBarSource, typeof VMediaProgressBarTypes>
  VMediaVolume: Check<typeof VMediaVolumeSource, typeof VMediaVolumeTypes>
  VMenu: Check<typeof VMenuSource, typeof VMenuTypes>
  VMessages: Check<typeof VMessagesSource, typeof VMessagesTypes>
  VMonthPicker: Check<typeof VMonthPickerSource, typeof VMonthPickerTypes>
  VNavigationDrawer: Check<typeof VNavigationDrawerSource, typeof VNavigationDrawerTypes>
  VNoSsr: Check<typeof VNoSsrSource, typeof VNoSsrTypes>
  VNumberInput: Check<typeof VNumberInputSource, typeof VNumberInputTypes>
  VOtpField: Check<typeof VOtpFieldSource, typeof VOtpFieldTypes>
  VOtpGroup: Check<typeof VOtpGroupSource, typeof VOtpGroupTypes>
  VOtpInput: Check<typeof VOtpInputSource, typeof VOtpInputTypes>
  VOtpSeparator: Check<typeof VOtpSeparatorSource, typeof VOtpSeparatorTypes>
  VOverlay: Check<typeof VOverlaySource, typeof VOverlayTypes>
  VPagination: Check<typeof VPaginationSource, typeof VPaginationTypes>
  VParallax: Check<typeof VParallaxSource, typeof VParallaxTypes>
  VPicker: Check<typeof VPickerSource, typeof VPickerTypes>
  VPickerTitle: Check<typeof VPickerTitleSource, typeof VPickerTitleTypes>
  VPie: Check<typeof VPieSource, typeof VPieTypes>
  VPieSegment: Check<typeof VPieSegmentSource, typeof VPieSegmentTypes>
  VPieTooltip: Check<typeof VPieTooltipSource, typeof VPieTooltipTypes>
  VProgress: Check<typeof VProgressSource, typeof VProgressTypes>
  VProgressCircular: Check<typeof VProgressCircularSource, typeof VProgressCircularTypes>
  VProgressLinear: Check<typeof VProgressLinearSource, typeof VProgressLinearTypes>
  VPullToRefresh: Check<typeof VPullToRefreshSource, typeof VPullToRefreshTypes>
  VRadio: Check<typeof VRadioSource, typeof VRadioTypes>
  VRadioGroup: Check<typeof VRadioGroupSource, typeof VRadioGroupTypes>
  VRangeSlider: Check<typeof VRangeSliderSource, typeof VRangeSliderTypes>
  VRating: Check<typeof VRatingSource, typeof VRatingTypes>
  VResponsive: Check<typeof VResponsiveSource, typeof VResponsiveTypes>
  VRow: Check<typeof VRowSource, typeof VRowTypes>
  VScaleTransition: Check<typeof VScaleTransitionSource, typeof VScaleTransitionTypes>
  VScrollXReverseTransition: Check<typeof VScrollXReverseTransitionSource, typeof VScrollXReverseTransitionTypes>
  VScrollXTransition: Check<typeof VScrollXTransitionSource, typeof VScrollXTransitionTypes>
  VScrollYReverseTransition: Check<typeof VScrollYReverseTransitionSource, typeof VScrollYReverseTransitionTypes>
  VScrollYTransition: Check<typeof VScrollYTransitionSource, typeof VScrollYTransitionTypes>
  VSelect: Check<typeof VSelectSource, typeof VSelectTypes>
  VSelectionControl: Check<typeof VSelectionControlSource, typeof VSelectionControlTypes>
  VSelectionControlGroup: Check<typeof VSelectionControlGroupSource, typeof VSelectionControlGroupTypes>
  VSheet: Check<typeof VSheetSource, typeof VSheetTypes>
  VSkeletonLoader: Check<typeof VSkeletonLoaderSource, typeof VSkeletonLoaderTypes>
  VSlideGroup: Check<typeof VSlideGroupSource, typeof VSlideGroupTypes>
  VSlideGroupItem: Check<typeof VSlideGroupItemSource, typeof VSlideGroupItemTypes>
  VSlideXReverseTransition: Check<typeof VSlideXReverseTransitionSource, typeof VSlideXReverseTransitionTypes>
  VSlideXTransition: Check<typeof VSlideXTransitionSource, typeof VSlideXTransitionTypes>
  VSlideYReverseTransition: Check<typeof VSlideYReverseTransitionSource, typeof VSlideYReverseTransitionTypes>
  VSlideYTransition: Check<typeof VSlideYTransitionSource, typeof VSlideYTransitionTypes>
  VSlider: Check<typeof VSliderSource, typeof VSliderTypes>
  VSnackbar: Check<typeof VSnackbarSource, typeof VSnackbarTypes>
  VSnackbarQueue: Check<typeof VSnackbarQueueSource, typeof VSnackbarQueueTypes>
  VSpacer: Check<typeof VSpacerSource, typeof VSpacerTypes>
  VSparkline: Check<typeof VSparklineSource, typeof VSparklineTypes>
  VSparklineTooltip: Check<typeof VSparklineTooltipSource, typeof VSparklineTooltipTypes>
  VSpeedDial: Check<typeof VSpeedDialSource, typeof VSpeedDialTypes>
  VSplitBtn: Check<typeof VSplitBtnSource, typeof VSplitBtnTypes>
  VStepper: Check<typeof VStepperSource, typeof VStepperTypes>
  VStepperActions: Check<typeof VStepperActionsSource, typeof VStepperActionsTypes>
  VStepperHeader: Check<typeof VStepperHeaderSource, typeof VStepperHeaderTypes>
  VStepperItem: Check<typeof VStepperItemSource, typeof VStepperItemTypes>
  VStepperVertical: Check<typeof VStepperVerticalSource, typeof VStepperVerticalTypes>
  VStepperVerticalActions: Check<typeof VStepperVerticalActionsSource, typeof VStepperVerticalActionsTypes>
  VStepperVerticalItem: Check<typeof VStepperVerticalItemSource, typeof VStepperVerticalItemTypes>
  VStepperWindow: Check<typeof VStepperWindowSource, typeof VStepperWindowTypes>
  VStepperWindowItem: Check<typeof VStepperWindowItemSource, typeof VStepperWindowItemTypes>
  VSvgIcon: Check<typeof VSvgIconSource, typeof VSvgIconTypes>
  VSwitch: Check<typeof VSwitchSource, typeof VSwitchTypes>
  VSystemBar: Check<typeof VSystemBarSource, typeof VSystemBarTypes>
  VTab: Check<typeof VTabSource, typeof VTabTypes>
  VTable: Check<typeof VTableSource, typeof VTableTypes>
  VTabs: Check<typeof VTabsSource, typeof VTabsTypes>
  VTabsWindow: Check<typeof VTabsWindowSource, typeof VTabsWindowTypes>
  VTabsWindowItem: Check<typeof VTabsWindowItemSource, typeof VTabsWindowItemTypes>
  VTextField: Check<typeof VTextFieldSource, typeof VTextFieldTypes>
  VTextarea: Check<typeof VTextareaSource, typeof VTextareaTypes>
  VThemeProvider: Check<typeof VThemeProviderSource, typeof VThemeProviderTypes>
  VTimeInput: Check<typeof VTimeInputSource, typeof VTimeInputTypes>
  VTimePicker: Check<typeof VTimePickerSource, typeof VTimePickerTypes>
  VTimePickerClock: Check<typeof VTimePickerClockSource, typeof VTimePickerClockTypes>
  VTimePickerControls: Check<typeof VTimePickerControlsSource, typeof VTimePickerControlsTypes>
  VTimeline: Check<typeof VTimelineSource, typeof VTimelineTypes>
  VTimelineItem: Check<typeof VTimelineItemSource, typeof VTimelineItemTypes>
  VToolbar: Check<typeof VToolbarSource, typeof VToolbarTypes>
  VToolbarItems: Check<typeof VToolbarItemsSource, typeof VToolbarItemsTypes>
  VToolbarTitle: Check<typeof VToolbarTitleSource, typeof VToolbarTitleTypes>
  VTooltip: Check<typeof VTooltipSource, typeof VTooltipTypes>
  VTreeview: Check<typeof VTreeviewSource, typeof VTreeviewTypes>
  VTreeviewGroup: Check<typeof VTreeviewGroupSource, typeof VTreeviewGroupTypes>
  VTreeviewItem: Check<typeof VTreeviewItemSource, typeof VTreeviewItemTypes>
  VValidation: Check<typeof VValidationSource, typeof VValidationTypes>
  VVideo: Check<typeof VVideoSource, typeof VVideoTypes>
  VVideoControls: Check<typeof VVideoControlsSource, typeof VVideoControlsTypes>
  VVirtualScroll: Check<typeof VVirtualScrollSource, typeof VVirtualScrollTypes>
  VWindow: Check<typeof VWindowSource, typeof VWindowTypes>
  VWindowItem: Check<typeof VWindowItemSource, typeof VWindowItemTypes>
}

export type Failures = { [K in keyof Checks]: [Checks[K]] extends [never] ? never : `${K}.${Checks[K] & string}` }[keyof Checks]

describe('handwritten component types', () => {
  it('match source components', () => {
    assertType<never>(null as unknown as Failures)
  })
})
