---
title: Java实现Base128编码
tags:
  - Java
categories:
  - 程序员
toc: false
date: 2022-08-23 17:24:10
---

```java
/**
 * @author Gao Youbo
 * @since 2022-08-19 10:28
 */
public class Base128 {
    private static final char[] DEFAULT_CHAR_TABLE = {
            '0', '1', '2', '3', '4', '5', '6', '7',
            '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
            'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
            'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
            'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
            'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
            'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
            'u', 'v', 'w', 'x', 'y', 'z', '-', '_',

            'α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ',
            'ι', 'κ', 'λ', 'μ', 'ν', 'ξ', 'ο', 'π',
            'ρ', 'ς', 'σ', 'τ', 'υ', 'φ', 'χ', 'ψ',
            'ω', 'à', 'á', 'â', 'ã', 'ä', 'å', 'æ',
            'ç', 'è', 'é', 'ê', 'ë', 'ì', 'í', 'î',
            'ï', 'ð', 'ñ', 'ò', 'ó', 'ô', 'õ', 'ö',
            '÷', 'ø', 'ù', 'ú', 'û', 'ü', 'ý', 'þ',
            'ÿ', 'Ā', 'ā', 'Ă', 'ă', 'Ą', 'ą', 'Ć',
    };

    private final char[] charTable;
    private final HashMap<Character, Integer> indexTable;

    public Base128() {
        this(DEFAULT_CHAR_TABLE);
    }

    public Base128(char[] charTable) {
        this.charTable = charTable;
        this.indexTable = new HashMap<>(charTable.length);
        for (int j = 0; j < charTable.length; j++) {
            indexTable.put(charTable[j], j);
        }
    }

    private String encodeToString(byte[] data) {
        if (data == null || data.length == 0) {
            return "";
        }
        StringBuilder sb = new StringBuilder();
        int tail = 0;
        for (int i = 0; i < data.length; i++) {
            int mov = (i % 7 + 1);
            int curr = 0xFF & data[i];
            int code = tail + (curr >> mov);
            sb.append(charTable[code]);
            tail = (0xFF & (curr << (8 - mov))) >> 1;
            if (mov == 7) {
                sb.append(charTable[tail]);
                tail = 0;
            }
        }
        sb.append(charTable[tail]);
        return sb.toString();
    }

    private byte[] decode(String str) {
        if (StringUtils.isBlank(str)) {
            return new byte[]{};
        }
        int length = (int) Math.floor(str.length() * 0.875);
        byte[] result = new byte[length];
        int idx = 0;
        int head = indexTable.get(str.charAt(0)) << 1;
        for (int i = 1; i < str.length(); ) {
            int mod = i % 8;
            int code = indexTable.get(str.charAt(i++));
            result[idx++] = (byte) (0xFF & (head + (code >> (7 - mod))));
            if (mod == 7) {
                head = 0xFF & (indexTable.get(str.charAt(i++)) << 1);
            } else {
                head = 0xFF & (code << (mod + 1));
            }
        }
        return result;
    }
}
```

下面提供一份更全的编码字节表，使用这个表可以实现Base256等

```
private static final char[] symbolTable = {
        '0', '1', '2', '3', '4', '5', '6', '7',
        '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
        'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
        'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
        'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
        'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
        'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
        'u', 'v', 'w', 'x', 'y', 'z', '-', '_',

        'α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ',
        'ι', 'κ', 'λ', 'μ', 'ν', 'ξ', 'ο', 'π',
        'ρ', 'ς', 'σ', 'τ', 'υ', 'φ', 'χ', 'ψ',
        'ω', 'à', 'á', 'â', 'ã', 'ä', 'å', 'æ',
        'ç', 'è', 'é', 'ê', 'ë', 'ì', 'í', 'î',
        'ï', 'ð', 'ñ', 'ò', 'ó', 'ô', 'õ', 'ö',
        '÷', 'ø', 'ù', 'ú', 'û', 'ü', 'ý', 'þ',
        'ÿ', 'Ā', 'ā', 'Ă', 'ă', 'Ą', 'ą', 'Ć',

        'ć',
        'Ĉ', 'ĉ', 'Ċ', 'ċ', 'Č', 'č', 'Ď', 'ď',
        'Đ', 'đ', 'Ē', 'ē', 'Ĕ', 'ĕ', 'Ė', 'ė',
        'Ę', 'ę', 'Ě', 'ě', 'Ĝ', 'ĝ', 'Ğ', 'ğ',
        'Ġ', 'ġ', 'Ģ', 'ģ', 'Ĥ', 'ĥ', 'Ħ', 'ħ',
        'Ĩ', 'ĩ', 'Ī', 'ī', 'Ĭ', 'ĭ', 'Į', 'į',
        'İ', 'ı', 'Ĳ', 'ĳ', 'Ĵ', 'ĵ', 'Ķ', 'ķ',
        'ĸ', 'Ĺ', 'ĺ', 'Ļ', 'ļ', 'Ľ', 'ľ', 'Ŀ',
        'ŀ', 'Ł', 'ł', 'Ń', 'ń', 'Ņ', 'ņ', 'Ň',
        'ň', 'ŉ', 'Ŋ', 'ŋ', 'Ō', 'ō', 'Ŏ', 'ŏ',
        'Ő', 'ő', 'Œ', 'œ', 'Ŕ', 'ŕ', 'Ŗ', 'ŗ',
        'Ř', 'ř', 'Ś', 'ś', 'Ŝ', 'ŝ', 'Ş', 'ş',
        'Š', 'š', 'Ţ', 'ţ', 'Ť', 'ť', 'Ŧ', 'ŧ',
        'Ũ', 'ũ', 'Ū', 'ū', 'Ŭ', 'ŭ', 'Ů', 'ů',
        'Ű', 'ű', 'Ų', 'ų', 'Ŵ', 'ŵ', 'Ŷ', 'ŷ',
        'Ÿ', 'Ź', 'ź', 'Ż', 'ż', 'Ž', 'ž', 'ſ',
        'ƀ', 'Ɓ', 'Ƃ', 'ƃ', 'Ƅ', 'ƅ', 'Ɔ', 'Ƈ',
        'ƈ', 'Ɖ', 'Ɗ', 'Ƌ', 'ƌ', 'ƍ', 'Ǝ', 'Ə',
        'Ɛ', 'Ƒ', 'ƒ', 'Ɠ', 'Ɣ', 'ƕ', 'Ɩ', 'Ɨ',
        'Ƙ', 'ƙ', 'ƚ', 'ƛ', 'Ɯ', 'Ɲ', 'ƞ', 'Ɵ',
        'Ơ', 'ơ', 'Ƣ', 'ƣ', 'Ƥ', 'ƥ', 'Ʀ', 'Ƨ',
        'ƨ',

        // '=', '*', '&', '^', '%', '$', '#', '@'
};
```

