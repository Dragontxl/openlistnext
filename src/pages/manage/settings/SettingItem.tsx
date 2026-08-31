import {
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  Select,
  SelectContent,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectOptionIndicator,
  SelectOptionText,
  SelectPlaceholder,
  SelectTrigger,
  SelectValue,
  Switch as HopeSwitch,
  Textarea,
} from "@hope-ui/solid"
import { For, Match, Show, Switch, createResource } from "solid-js"
import { useT } from "~/hooks"
import { Flag, SettingItem, Type } from "~/types"
import type { PageResp, Storage } from "~/types"
import { r } from "~/utils"
import { TiDelete } from "solid-icons/ti"

export type ItemProps = SettingItem & {
  onChange?: (value: string) => void
  onDelete?: () => void
  hideLabel?: boolean
  w?: string
}

/** 中转存储选择器：从已挂载存储中选择一个作为跨存储复制的中转 */
const RelayStorageSelect = (props: ItemProps) => {
  const t = useT()
  const [storages] = createResource(
    (): Promise<PageResp<Storage>> => r.get("/admin/storage/list"),
  )
  // 接口返回分页结构，数据在 data.content；latest 读取不抛错，加载/失败时为 undefined
  const options = (): Storage[] =>
    (storages.latest?.data?.content || []).filter((s: Storage) => !s.disabled)
  return (
    <Select
      id={props.key}
      value={props.value || ""}
      onChange={(e) => props.onChange?.(e)}
    >
      <SelectTrigger>
        <SelectPlaceholder>{t("global.choose")}</SelectPlaceholder>
        <SelectValue />
        <SelectIcon />
      </SelectTrigger>
      <SelectContent>
        <SelectListbox>
          <SelectOption value="">
            <SelectOptionText>
              {t("settings.relay_storage_none")}
            </SelectOptionText>
            <SelectOptionIndicator />
          </SelectOption>
          <For each={options()}>
            {(s) => (
              <SelectOption value={s.mount_path}>
                <SelectOptionText>
                  {`${s.mount_path} (${s.driver})`}
                </SelectOptionText>
                <SelectOptionIndicator />
              </SelectOption>
            )}
          </For>
        </SelectListbox>
      </SelectContent>
    </Select>
  )
}

const Item = (props: ItemProps) => {
  const t = useT()
  return (
    <FormControl w={props.w ?? "100%"} display="flex" flexDirection="column">
      <Show when={!props.hideLabel}>
        <FormLabel for={props.key} display="flex" alignItems="center">
          {t(`settings.${props.key}`)}
          <Show when={props.flag === Flag.DEPRECATED}>
            <Icon
              ml="$2"
              as={TiDelete}
              boxSize="$5"
              color="$danger9"
              verticalAlign="middle"
              cursor="pointer"
              onClick={() => {
                props.onDelete?.()
              }}
            />
          </Show>
        </FormLabel>
      </Show>
      <Switch fallback={<Center>{t("settings_other.unknown_type")}</Center>}>
        <Match when={props.key === "relay_storage"}>
          <RelayStorageSelect {...props} />
        </Match>
        <Match when={[Type.String, Type.Number].includes(props.type)}>
          <Input
            type={props.type === Type.Number ? "number" : ""}
            min={
              props.type === Type.Number
                ? props.key.includes("page_size")
                  ? 1
                  : 0
                : undefined
            }
            step={props.type === Type.Number ? 1 : undefined}
            id={props.key}
            value={props.value}
            onInput={(e) => {
              if (
                props.type === Type.Number &&
                props.key.includes("page_size")
              ) {
                const clean = e.currentTarget.value.replace(/[^0-9]/g, "")
                props.onChange?.(clean)
              } else {
                props.onChange?.(e.currentTarget.value)
              }
            }}
            readOnly={props.flag === Flag.READONLY}
          />
        </Match>
        <Match when={props.type === Type.Bool}>
          <HopeSwitch
            id={props.key}
            checked={props.value === "true"}
            onChange={(e: { currentTarget: HTMLInputElement }) =>
              props.onChange?.(e.currentTarget?.checked ? "true" : "false")
            }
            readOnly={props.flag === Flag.READONLY}
          />
        </Match>
        <Match when={props.type === Type.Text}>
          <Textarea
            id={props.key}
            value={props.value}
            onChange={(e) => props.onChange?.(e.currentTarget.value)}
            readOnly={props.flag === Flag.READONLY}
          />
        </Match>
        <Match when={props.type === Type.Select}>
          <Select
            id={props.key}
            value={props.value}
            onChange={(e) => props.onChange?.(e)}
            readOnly={props.flag === Flag.READONLY}
          >
            <SelectTrigger>
              <SelectPlaceholder>{t("global.choose")}</SelectPlaceholder>
              <SelectValue />
              <SelectIcon />
            </SelectTrigger>
            <SelectContent>
              <SelectListbox>
                <For each={props.options?.split(",")}>
                  {(item) => (
                    <SelectOption value={item}>
                      <SelectOptionText>
                        {t(`settings.${props.key}s.${item}`)}
                      </SelectOptionText>
                      <SelectOptionIndicator />
                    </SelectOption>
                  )}
                </For>
              </SelectListbox>
            </SelectContent>
          </Select>
        </Match>
      </Switch>
      <FormHelperText>
        {props.help ? t(`settings.${props.key}-tips`) : ""}
      </FormHelperText>
    </FormControl>
  )
}

export { Item }
